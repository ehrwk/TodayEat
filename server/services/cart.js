const Op = require("sequelize").Op;

const { User, Food, sequelize, Sequelize } = require("../models");

exports.makeCartTable = async () => {
  return await Cart.findAll({
    include: [
      {
        model: User,
        require: true,
        attributes: ["user_id"],
      },
      {
        model: Food,
        require: true,
        attributes: ["category", "food_name"],
      }
    ],
    attributes: [
      "is_check",
    ]
    //sequelize attributes exclude
  })
}

exports.insertId = async (userId) => {
  return await Cart.create({
    user_id: userId,
  });
};

exports.getCartByCategory = async (userId, category) => {
    return await Cart.findAll({
      where: {
        user_id: userId,
        category: category,
      },
      order: [["food_num", "DESC"]],
    });
};

exports.updateCart = async (userId, category, foodName, isChecked) => {
  return await Cart.update(
    {
      is_checked: isChecked,  
    },
    {
      where: {
        user_id: userId,
        category: category,
        food_name: foodName,
      }
    }  
  );
};
