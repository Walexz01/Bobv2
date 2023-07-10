const express = require('express');
const router = express.Router();
const {makePayment,Payments,rejectOrder} = require('../data/payment')

router.get('/',async (req,res)=>{
    const result =  await Payments()
    res.send(result)
})

router.put('/rejectorder/:order_id', async (req,res)=>{
    const  order_id = req.params.order_id
    await rejectOrder(order_id)
    res.send('done')

})

// router.put('/approveorder/:order_id', async (req,res)=>{
//     const  order_id = req.params.order_id
//     await approveOrder(order_id)
//     res.send('done')

// })

router.post('/:orderid',async (req,res)=>{
    const order_id = req.params.orderid
    const {method_name,amount} =  req.body
    await makePayment(order_id,method_name,amount)
    res.send('payment was successful')
})









module.exports = router;