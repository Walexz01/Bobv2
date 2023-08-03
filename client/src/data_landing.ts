// images for Program section
import gym_center from './assets/gmy-center.png'
import personal_train from './assets/personal_train.png'
import track from './assets/progress.png'
import community from './assets/community.png'
// images for Trainers section
import trainer1 from './assets/trainer1.jpg'
import trainer2 from './assets/trainer2.jpg'
import trainer3 from './assets/trainer3.jpg'
// images for Trainers section
import why1 from './assets/fitness.png'
import why2 from './assets/bag.png'
import why3 from './assets/modern equip.png'
import why4 from './assets/bottle.png'
// offer
import offerLeft from "./assets/offer.jpg";
// workoutGallery
import gallery2 from "./assets/gallery2.jpg";
import gallery1 from "./assets/gallery1.jpg";
import gallery3 from "./assets/gallery3.jpg";



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
    des:"We aims to revolutionize the way you approach fitness. We go beyond just selling products; we offer an immersive experience that combines shopping, training, and community engagement. Embrace the journey to a healthier lifestyle with us and witness the positive impact it can have on your life"

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



// Why choose us 
interface WhyUSList{
    image : string;
    text:string
}
export const WhyUsList:WhyUSList[]=[
    {
        image:why1,
        text:'Free Fitness Training'
    },
    {
        image:why2,
        text:'Strength Training Session'
    },
    {
        image:why3,
        text:'Flexible Weight Training'
    },
    {
        image:why4,
        text:'Nutritions'
    },

]
// offer
export const offer={
    head:'SPECIAL OFFER THIS SUMMER GET FULL BENEFITS FOR YEAR WITH 20% DISCOUNT.',
    desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur exercitationem amet quas repellendus esse natus.',
    image:offerLeft
}

// workout gallery

export const workOutGallery=[
    gallery1,gallery2,gallery3,gallery3
] 

// package
interface packageInter{
    price:string;
    head:string
    benefit:string[]
}
export const packages:packageInter[]=[
    {
        price:'$59/Month',
         head:'Body Building Training',
         benefit:['Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",]
    },
    {
        price:'$59/Month',
         head:'Body Building Training',
         benefit:['Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",]
    },
    {
        price:'$59/Month',
         head:'Body Building Training',
         benefit:['Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",'Get Free WiFi',"Get Free WiFi",]
    },
]