const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const helmet = require("helmet")
const customer = require('../server/routes/customers')
const product = require('../server/routes/products')
const sales = require('../server/routes/sales')
const orders = require('../server/routes/orders')
const payments = require('../server/routes/payment')
const auth = require('../server/routes/auth')




const cors = require('cors');

app.use(cookieparser())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.use('/api/customers', customer)
app.use('/api/products', product)
app.use('/api/sales', sales)
app.use('/api/orders', orders)
app.use('/api/payments',payments)
app.use('/api/auth',auth)






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));



