const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");

// const { isLoggendIn, inNotLoggedIn } = require("../middleware");


const userService = require("../services/user");
const cartService = require("../services/cart");


router.get("/:id", async(req, res) => {
    let result
    result = req.Cart.makeCartTable();
    result = req.cartService.insertId(req.user.user_id);

    if (result) {
        return res.status(200).send({
          success: true,
          data: result,
        });
      } else {
        return res.status(400).send({
          success: false,
          data: {},
          message: "server error",
        });
    }

});

//category
router.get("/:id/:category", async(req, res) => {
    const userId = req.query.user_id;
    const category = req.query.category; // toDo: front에서 axios요청 수정해야함

    const result = await cartService.getCartByCategory(userId, category);

    if (result) {
        return res.status(200).send({
          success: true,
          data: result,
        });
      } else {
        return res.status(400).send({
          success: false,
          data: {},
          message: "server error",
        });
      }

});

router.put("/:id/:category/:is_checked", async(req, res) => {
  const userId = req.query.user_id;
  const category = req.query.category;
  const foodName = req.query.food_name;
  const isChecked = req.query.is_checked;
  

  const result = await cartService.updateCart(userId, category, foodName, isChecked);

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});



module.exports = router;