import {AiOutlineHome} from 'react-icons/ai'
import {RxPerson} from 'react-icons/rx'
import {TbExchange} from 'react-icons/tb'
import {BsBag} from 'react-icons/bs'
import {BiDollarCircle} from 'react-icons/bi'
import {SlSocialDropbox} from 'react-icons/sl'
import {BiUser} from 'react-icons/bi'
import { IconType } from 'react-icons'

export interface Link{
    name:string,
    path:string,
    Icon:IconType
    show?:string,
    handleClick?:()=>void

}

export const Links:Link[] = [
    {
        name: "Home",
        path: 'home',
        Icon:AiOutlineHome
    },
    {
        name: "Customers",
        path: 'customers',
        Icon: RxPerson
    },
    {
        name: "Orders",
        path: 'orders',
        Icon:TbExchange
    },
    {
        name: "Sales",
        path: 'sales',
        Icon: BsBag
    },
    {
        name: "Payments",
        path: 'payments',
        Icon: BiDollarCircle
    },
    {
        name: "Products",
        path: 'products',
        Icon: SlSocialDropbox
    },
    {
        name: "Worker",
        path: 'workers',
        Icon: BiUser
    }
]

export interface OrderType{
    "Order_id":number;
    "Customer_name":string;
    "Total_amount":number;
    "Status_name":string
}

export const RecentOrders:OrderType[] =[
    {
        "Order_id":1,
        "Customer_name":"walexz",
        "Total_amount" :175,
        "Status_name" :"pending"
    },
    {
        "Order_id":2,
        "Customer_name":"walex",
        "Total_amount" :173,
        "Status_name" :"completed"
    },
    {
        "Order_id":3,
        "Customer_name":"onenine",
        "Total_amount" :1735,
        "Status_name" :"pending"
    },
    {
        "Order_id":4,
        "Customer_name":"walexz",
        "Total_amount" :1735,
        "Status_name" :"pending"
    },{
        "Order_id":5,
        "Customer_name":"bola",
        "Total_amount" :17905,
        "Status_name" :"cancel"
    },
    {
        "Order_id":6,
        "Customer_name":"walexz",
        "Total_amount" :1735,
        "Status_name" :"pending"
    },{
        "Order_id":7,
        "Customer_name":"mosoba",
        "Total_amount" :1,
        "Status_name" :"completed"
    },
    {
        "Order_id":8,
        "Customer_name":"sina",
        "Total_amount" :1735,
        "Status_name" :"pending"
    },{
        "Order_id":9,
        "Customer_name":"nike",
        "Total_amount" :1735,
        "Status_name" :"pending"
    },
    {
        "Order_id":10,
        "Customer_name":"israel",
        "Total_amount" :15,
        "Status_name" :"completed"
    }
]
export interface Topcustomer {
    id: number;
    Customer_name: string;
    Total_order: number;
  }
  
export const Topcustomers:Topcustomer[] =[
    {
        "id":1,
        "Customer_name":"walexz",
        "Total_order" :175
    },
    {
        "id":2,
        "Customer_name":"walex",
        "Total_order" :173
    },
    {
        "id":3,
        "Customer_name":"onenine",
        "Total_order" :17
    },
    {
        "id":4,
        "Customer_name":"walexz",
        "Total_order" :15
    },{
        "id":5,
        "Customer_name":"bola",
        "Total_order" :17905
    },
    {
        "id":6,
        "Customer_name":"walexz",
        "Total_order" :1735
    },{
        "id":7,
        "Customer_name":"mosoba",
        "Total_order" :1,
    },
    {
        "id":8,
        "Customer_name":"sina",
        "Total_order" :1735
    },{
        "id":9,
        "Customer_name":"nike",
        "Total_order" :1735
    },
    {
        "id":10,
        "Customer_name":"israel",
        "Total_order" :15
    }
]
export interface Topproduct {
    id: number;
    Name: string;
    Total_purchase: number;
    Unit_price: number;
  }
export interface Product{
    id: number;
    name: string;
    quantity_in_stock: number;
    description: string;
    unit_price: number;
  }

export interface Sale{
    order_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    order_date: number;
  }

export const AllSale:Sale[] =[
    {  
        order_id: 1,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
    {  
        order_id: 2,
        product_id: 11,
        product_name: 'string',
        quantity: 22,
        unit_price: 33,
        total_price: 44,
        order_date: 11,
    },
  ]
export const AllProducts:Product[] =[
    {
        "id":1,
        "name":"walexz",
        "quantity_in_stock" :175,
        "description":'Great',
        "unit_price" : 8956
    },
    {
        "id":2,
        "name":"walex",
        "quantity_in_stock" :173,
        "description":'Great ghvhhjh',
        "unit_price" : 388
    },
    {
        "id":3,
        "name":"onenine",
        "quantity_in_stock" :1735,
        "description":'Great ghvhhjh nn  hvvs',
        "unit_price" : 3984
    },
    {
        "id":4,
        "name":"walexz",
        "quantity_in_stock" :1735,
        "description":'Great  nn  hvvs',
        "unit_price" : 387
    },{
        "id":5,
        "name":"bola",
        "quantity_in_stock" :17905,
        "description":'Great  nn ,jbhj hvvs',
        "unit_price" : 3849
    },
    {
        "id":6,
        "name":"walexz",
        "quantity_in_stock" :1735,
        "description":'Great  nn ,jbhj hvvs',
        "unit_price" : 263
    },{
        "id":7,
        "name":"mosoba",
        "quantity_in_stock" :1,
        "description":'Great vgvyu nn ,jbhj hvvs',
        "unit_price" : 894
    },
    {
        "id":8,
        "name":"sina",
        "description":'Great vgvyu nn ,jbhj hvvs',
        "quantity_in_stock" :1735,
        "unit_price" : 89
    },{
        "id":9,
        "name":"nike",
        "quantity_in_stock" :1735,
        "description":'Great vgvyu nn ,jbhj hvvs',
        "unit_price" : 34
    },
    {
        "id":10,
        "name":"israel",
        "quantity_in_stock" :15,
        "description":'Great vgvyu nn ,jbhj hvvs',
        "unit_price" : 134
    }
]

export const Topproducts:Topproduct[] =[
    {
        "id":1,
        "Name":"walexz",
        "Total_purchase" :175,
        "Unit_price" : 8956
    },
    {
        "id":2,
        "Name":"walex",
        "Total_purchase" :173,
        "Unit_price" : 388
    },
    {
        "id":3,
        "Name":"onenine",
        "Total_purchase" :1735,
        "Unit_price" : 3984
    },
    {
        "id":4,
        "Name":"walexz",
        "Total_purchase" :1735,
        "Unit_price" : 387
    },{
        "id":5,
        "Name":"bola",
        "Total_purchase" :17905,
        "Unit_price" : 3849
    },
    {
        "id":6,
        "Name":"walexz",
        "Total_purchase" :1735,
        "Unit_price" : 263
    },{
        "id":7,
        "Name":"mosoba",
        "Total_purchase" :1,
        "Unit_price" : 894
    },
    {
        "id":8,
        "Name":"sina",
        "Total_purchase" :1735,
        "Unit_price" : 89
    },{
        "id":9,
        "Name":"nike",
        "Total_purchase" :1735,
        "Unit_price" : 34
    },
    {
        "id":10,
        "Name":"israel",
        "Total_purchase" :15,
        "Unit_price" : 134
    }
]