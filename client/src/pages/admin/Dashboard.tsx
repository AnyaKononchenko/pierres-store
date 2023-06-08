import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Loading } from "components";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getStats, selectPending, selectStats } from "features/helperSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectStats)
  const loading = useAppSelector(selectPending);

  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])

  return (
    <>
      {loading && <Loading />}
      <section className='w-[90vw] lg:w-[50vw]'>
        <h2 className='font-bold text-center text-[1.5rem] mb-4 text-zinc-300'>
          Store Management Tool
        </h2>
        <div className='flex flex-col justify-around items-center p-3 bg-[#FDC175] border-[#A8824F] border-4'>
          {stats && <div id='statistics' className='w-full mb-6'>
            <p>
              Total categories: <span>{stats.categories}</span>
            </p>
            <p>
              Total products: <span>{stats.products}</span>
            </p>
            <p>
              Total users: <span>{stats.users}</span>
            </p>
          </div>}
          <div
            id='actions'
            className='flex flex-col w-[98%] border-[#A8824F] border-4'
          >
            <Link
              to='/products-board'
              className='p-2 hover:bg-[#A8824F] hover:font-bold duration-100'
            >
              Manage Products
            </Link>
            <Link
              to='/categories-board'
              className='p-2 hover:bg-[#A8824F] hover:font-bold duration-100'
            >
              Manage Categories
            </Link>
            <Link
              to='/users-board'
              className='p-2 hover:bg-[#A8824F] hover:font-bold duration-100'
            >
              Manage Users
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
