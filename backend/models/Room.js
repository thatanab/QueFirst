module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        roomName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        roomStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roomImage: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "rooms"
    });

    Room.associate = (models) => {
        Room.hasMany(models.Reserve, { foreignKey: "roomId" });
    };

    return Room;
}