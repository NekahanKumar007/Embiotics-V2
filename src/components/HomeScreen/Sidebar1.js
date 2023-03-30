import React, { useState, useEffect } from "react";
 import { BsArrowLeftShort,  } from "react-icons/bs";
 import Footer from "../Footer";
 import { AiFillEnvironment } from "react-icons/ai";
 import { RiDashboardFill } from "react-icons/ri";
 import { MdQuiz } from "react-icons/md";
 import { TbListDetails } from "react-icons/tb";
 import { BiLogOut } from "react-icons/bi";
 import "rsuite/dist/rsuite.min.css";
import './Sidebar.css'
import Detailing from "./Detailing";
import Quiz from './Quiz'
import Login from '../login/login'
import { NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
 const Sidebar1 = () => {

    const [open, setOpen] = useState(true);

    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<RiDashboardFill/>
        },
        {
            path:"/detailing",
            name:"Detailing",
            icon:<TbListDetails/>
        },
        {
            path:"/quiz",
            name:"Quiz",
            icon:<MdQuiz/>
        },
        {
          path:"/",
          name:"Signout",
          icon:<BiLogOut/>
      }
    ]

    return (

      <div className="flex">
  <div className="sidebar">
  <div
          className={`bg-dark-purple h-screen p-5 pt-8 ${
            open ? "w-64" : "w-20"
          } duration-700 relative`}
        >

<div className="inline-flex">
<BsArrowLeftShort
            className={` bg-white text-dark-purple text-3xl rounded-full absolute -right-2 top-9 border border-dark-purple cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          

           <div className="inline-flex" >

           <AiFillEnvironment
              className={`bg-amber-300 text-4xl rounder cursor-pointer block float-left py-2 mr-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />

            <h1
              className={`bg-dark-purple text-white origin-left font-medium text-3xl duration-700 
             ${!open && "scale-0"}`}
            >
              <b> EMBIOTICS </b>
            </h1>

            </div>
</div>
<div>
<ul className="pt-8">

{
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: open ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }

  
</ul>
</div>
         </div>              
  </div>

       
        </div>
      
    );
 }
 
 export default Sidebar1;