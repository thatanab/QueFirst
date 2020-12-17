module.exports = (sequelize, DataTypes) => {
    const Reserve = sequelize.define("Reserve", {
      date: {
        type: DataTypes.STRING
      },
      // time: {
      //   type: DataTypes.STRING,
      // },
      note: {
        type: DataTypes.STRING,
      },
      reserveStatus: {
        type: DataTypes.STRING,
      },
    },
      {
        tableName: "reserves",
        timestamps: true,
      });
  
    Reserve.associate = models => {
    //   Reserve.belongsTo(models.Promotion, { foreignKey: "promotionId" });
      Reserve.belongsTo(models.User, { foreignKey: "userId" });
      Reserve.belongsTo(models.Room, { foreignKey: "roomId" });
    };
  
    return Reserve;
  }