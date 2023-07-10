const express = require('express');
const router  = express.Router()

const  {getAllProducts,getProductByName,deleteProduct,updateProducts,createproduct,getTopProducts} = require('../data/products')

// this is sthe route to get the lists of all products 

router.get('/',async (req,res)=>{
    const result = await getAllProducts()
    res.send(result)
})

router.get('/top', async (req,res)=>{
    const result = await getTopProducts()
    res.send(result)
})

//  this is the router to get the produuct by passing their name as a search params

router.get('/:id',async (req,res)=>{
    const id = req.params.id
    const result = await getProductByName(id)
    res.send(result)
})


// this is the router  to delete product from the datbase by  passing the name as a search params

router.delete('/:id',async(req,res)=>{
    const id = req.params.id
    const result = await deleteProduct(id)
    res.send('Deleted successfully')
})

//  this the router to update  the products by passing the old name as para,s and passing the new details as a form

router.put('/:id',async(req,res)=>{
    const id = req.params.id
    const {description,quantity_in_stock,unit_price} = req.body
    const result = await updateProducts(description,quantity_in_stock,unit_price,id)
    res.send('updated successfully')
})

// this is the route for creating new product

router.post('/',async(req,res)=>{
    const {name,quantity_in_stock,description,unit_price} = req.body
    const result = await createproduct(name,quantity_in_stock,description,unit_price)
    res.send(result)


})


module.exports = router;