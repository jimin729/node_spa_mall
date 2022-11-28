const express = require("express");
const { count } = require("../schemas/goods.js");
const router = express.Router();

// /routes/goods.js
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];

  router.get("/goods", (req, res) => {
	res.status(200).json({goods});
});


router.get("/goods/:goodsId", (req, res) => {
	const { goodsId } = req.params;
	const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
	res.json({ detail });

});

router.get("/goods/cart", async(req,res) => {
    const carts = await cart.find({});
    const goodsIds = carts.map((cart) => {
        return cart.goodsIds;
    })
    const goods = await Goods.find({goodsId: goodsIds})

    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item) => item.goodsid === cart.goodsid),

        }
    })
 
    res.json({
        "carts": results,

    })    
    });

router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
  
    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length > 0) {
      await Cart.deleteOne({ goodsId });
    }
  
    res.json({ result: "success" });
  });

const Cart = require("../schemas/cart");
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;
  
    if (quantity < 1) {
        res.status(400).json({ errorMessage: "수량은 1 이상이어야 합니다." });
        return;
      }

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
      await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    }
  
    res.json({ success: true });
  })

const Goods = require("../schemas/goods.js");
router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
      }
    
      const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    
      res.json({ goods: createdGoods })
});

module.exports = router;