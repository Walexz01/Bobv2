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
