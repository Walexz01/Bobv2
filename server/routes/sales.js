const express = require('express');
const router = express.Router();
const {allSales,getOrderProductsById} = require('../data/order_products')


router.get('/',async(req,res)=>{
    const result = await allSales()
    res.send(result)
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const result = await getOrderProductsById(id)
    res.send(result)
})






module.exports = router;