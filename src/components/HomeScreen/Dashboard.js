import React from 'react'
import Home from './Home'
import axios from "axios";
import Sidebar1 from './Sidebar1';
const Dashboard = () => {
    


  
  return (
    <div>
      <Sidebar1 />
      <div className="flex flex-direction-right">
        <h1>Dashboard</h1>

        <button> Login Request</button>
        <button> Send Request</button>
      </div>
    </div>
  );
}

export default Dashboard