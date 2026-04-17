const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "paid",
      "processing",
      "ordered_from_china",
      "arrived_warehouse",
      "in_transit",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ),
    defaultValue: "pending",
  },
});

module.exports = Order;