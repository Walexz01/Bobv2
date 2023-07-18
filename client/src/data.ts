import {AiOutlineHome} from 'react-icons/ai'
import {RxPerson} from 'react-icons/rx'
import {TbExchange} from 'react-icons/tb'
import {BsBag} from 'react-icons/bs'
import {BiDollarCircle} from 'react-icons/bi'
import {SlSocialDropbox} from 'react-icons/sl'
import { IconType } from 'react-icons'

export interface Link{
    name:string,
    path:string,
    Icon:IconType

}

export const Links:Link[] = [
    {
        name: "Home",
        path: '/',
        Icon:AiOutlineHome
    },
    {
        name: "Customers",
        path: '/customers',
        Icon: RxPerson
    },
    {
        name: "Orders",
        path: '/orders',
        Icon:TbExchange
    },
    {
        name: "Sales",
        path: '/sales',
        Icon: BsBag
    },
    {
        name: "Payments",
        path: '/payments',
        Icon: BiDollarCircle
    },
    {
        name: "Products",
        path: '/products',
        Icon: SlSocialDropbox
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
export interface Customer {
    id: number;
    Customer_name: string;
    Total_order: number;
  }
  
export const Topcustomers:Customer[] =[
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
export interface Product {
    id: number;
    Name: string;
    Total_purchase: number;
    Unit_price: number;
  }

export const Topproducts:Product[] =[
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