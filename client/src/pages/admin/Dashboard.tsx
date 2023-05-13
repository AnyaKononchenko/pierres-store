import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-around items-center p-3'>
      <h2 className='font-bold text-[1.5rem] mb-4'>Store Management Tool</h2>
      <div id='statistics' className='w-full md:max-w-[60vw]'>
        <p>
          Total categories: <span>№</span>
        </p>
        <p>
          Total partners: <span>№</span>
        </p>
        <p>
          Total users: <span>№</span>
        </p>
      </div>
      <div id='actions' className="flex flex-col gap-3">
        <Link to="/products-board">Manage Products</Link>
        <Link to="/categories-board">Manage Categories</Link>
        <Link to="/users-board">Manage Users</Link>
      </div>
    </div>
  );
};

export default Dashboard;
