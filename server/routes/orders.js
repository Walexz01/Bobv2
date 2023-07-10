const express = require('express')
const router = express.Router()

const {orders,pendingOrders,completedOrders,orderByName,createOrder,addproducts, orderById} = require('../data/orders')

// this is end point to get the lists of orders 
router.get('/',async (req,res)=>{
    const result = await orders()
    res.send(result)
})

// this is end point to get the lists of pending orders 


router.get('/pending',async (req,res)=>{
    const result = await pendingOrders()
    res.send(result)
})


// this is end point to get the lists of completed orders 

router.get('/complete',async (req,res)=>{
    const result = await completedOrders()
    res.send(result)
})


//  this is end point to get the lists of all the oders of a customer by their name
router.get('/:name', async (req,res)=>{
    let name = req.params.name
    const result = await orderByName(name)
    res.send(result)
})

router.get('/getbyid/:id', async (req,res)=>{
    let id = req.params.id
    const result = await orderById(id)
    res.send(result)
})




// this is both of the routes need to create the order transaction

// this is the end point to create order 
router.post('/create',async (req,res)=>{
    const {customer_name,staff_name}  = req.body
    const result = await createOrder(customer_name,staff_name)
    res.send(result)
}) 

//   this is the endpoint to add products to be ordred to the database
router.post('/:id',async (req,res)=>{
    const id = req.params.id
    const {product_name,quantity} = req.body
    const result = await addproducts(id,product_name,quantity)
    res.send('order was successful')
})



module.exports = router;