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