module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     max: 16,
            //     min: 8
            // }
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false,
           
        },
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     max: 32,
            //     min: 3
            // }
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     isEmail: true,
            // }
        },
        role: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
            // validate: {
            //     max: 16,
            //     min: 8
            // }
        },
        photo: {
            type: DataTypes.STRING
        }

    }, {
        tableName: "users",
    });

    User.associate = models => {
        User.hasMany(models.Reserve, { foreignKey: "userId" })
    }

    return User;
};

