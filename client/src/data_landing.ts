// images for Program section
import gym_center from './assets/gmy-center.png'
import personal_train from './assets/personal_train.png'
import track from './assets/progress.png'
import community from './assets/community.png'
// images for Trainers section
import trainer1 from './assets/trainer1.jpg'
import trainer2 from './assets/trainer2.jpg'
import trainer3 from './assets/trainer3.jpg'

import {FaFacebookF} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'
import {AiFillInstagram} from 'react-icons/ai'
import {HiMail} from 'react-icons/hi'
import { IconType } from 'react-icons'

interface link{
    label:string;
    path:string;
}
export const Links:link[] = [
    {
        label:'Home',
        path:''
    },
    {
        label:'About',
        path:'about'
    },
    {
        label:'Contact',
        path:'contact'
    },
    {
        label:'Gallery',
        path:'gallery'
    },
    {
        label:'Palns',
        path:'plans'
    },
    {
        label:'Trainers',
        path:'trainers'
    },
]
interface header_hero{
    bg_text:string;
    htext:string;
    des:string;   
}

export const Header_hero:header_hero= {
    bg_text:'#100DaysOfWorkOut',
    htext:"Join the Legends Of The Fitness World",
    des:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo cum iusto ex aliquid aut eaque architecto. Expedita consequuntur ullam molestias sapiente omnis, consectetur dolore? Totam animi umque neque? Ratione, autem!"

}

// Our Program 
interface OurProgramInterface{
    image:string;
    heading:string;
    details:string
}

export const OurProgram:OurProgramInterface[]=[
    {
        image:gym_center,
        heading:'Gyming Center',
        details:'Top-notch gym with top-of-the-line equipment and expert trainers to guide and inspire all fitness levels. Elevate your workouts today!'

    },
    {
        image:personal_train,
        heading:'Personal Training',
        details:'Personalized attention from certified trainers. Tailored workouts for your goals. Progress and motivation guaranteed. Join us now!'

    },
    {
        image:community,
        heading:'Community and Support',
        details:'Embrace a like-minded fitness community, fueled by collective motivation. Our supportive staff and members will encourage your every step.'
    },
    {
        image:track,
        heading:'Fitness Tracking',
        details:'Track fitness progress with our integrated system. Monitor workouts, set goals, and celebrate achievements on your path to wellness.'
    },
]

// trainer
interface trainersLink{
    Icon:IconType;
    link:string;

}
interface Trainer{
    image:string;
    name:string;
    role:string;
    links:trainersLink[]
}
export const trainers:Trainer[]=[
    {
        image:trainer1,
        name:"Micheal John",
        role:"Yoga Trainer",
        links:[
            {
            Icon:FaFacebookF,
            link:'https://web.facebook.com/adewaleoluwaseun.adegbite/'
        },
            {
            Icon:BsTwitter,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:AiFillInstagram,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:HiMail,
            link:'mailto:walexz1937@gmail.com'
        },
    ]
    },
    {
        image:trainer2,
        name:"Peter John",
        role:"Yoga Trainer",
        links:[
            {
            Icon:FaFacebookF,
            link:'https://web.facebook.com/adewaleoluwaseun.adegbite/'
        },
            {
            Icon:BsTwitter,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:AiFillInstagram,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:HiMail,
            link:'mailto:walexz1937@gmail.com'
        },
    ]
    },
    {
        image:trainer3,
        name:"Ether John",
        role:"Yoga Trainer",
        links:[
            {
            Icon:FaFacebookF,
            link:'https://web.facebook.com/adewaleoluwaseun.adegbite/'
        },
            {
            Icon:BsTwitter,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:AiFillInstagram,
            link:'https://twitter.com/walexz01'
        },
            {
            Icon:HiMail,
            link:'mailto:walexz1937@gmail.com'
        },
    ]
    },
]


