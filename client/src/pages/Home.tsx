import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { BiMapPin } from "react-icons/bi";

import {
  PierrePortrait,
  Map,
  Farmer,
  Rancher,
  Business,
  FarmFresh,
  Community,
  Cashback,
  PierreSignature,
  Winter,
  Summer,
  Spring,
  Fall,
} from "assets";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProducts,
  selectPending,
  selectProducts,
  selectResponse,
} from "features/productsSlice";
import { FilterQuery, ProductWithCategory } from "@customTypes/products";
import { BestSeller } from "components/product";

const query: FilterQuery = {
  category: [],
  price: { minPrice: 0, maxPrice: 1000000 },
  search: "",
  sort: ["-sold"],
  page: 1,
  limit: 100,
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const response = useAppSelector(selectResponse);
  const loading = useAppSelector(selectPending);
  let bestSellers: ProductWithCategory[] = [];

  const seasons = [Spring, Summer, Fall, Winter];

  const currentSeason = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 5) {
      return "Spring";
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return "Summer";
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return "Autumn";
    } else {
      return "Winter";
    }
  }, []);

  useEffect(() => {
    dispatch(getProducts({ ...query, season: currentSeason }));
  }, [currentSeason, dispatch]);

  if (products && products.length > 0) {
    bestSellers = products.slice(0, 7);
  }

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className='pt-6 w-[100vw]'>
      <article className='flex flex-col gap-6 p-4 bg-[#1C0D25] min-h-[90vh]'>
        <div className='flex flex-col lg:flex-row gap-6 justify-center lg:justify-between items-center lg:pl-36'>
          <div className='flex flex-col justify-center items-center gap-4 w-full lg:w-[40%]'>
            <h1 className='font-silkscreen font-bold text-zinc-200 text-[2rem] lg:text-[3rem] text-center lg:text-left mb-10'>
              Finest Goods of Stardew Valley!
            </h1>
            <p className=' text-[1.2rem] text-zinc-200 text-center'>
              Seeds, crops, saplings, fertilizers, ingredients and so much more
              at Pierre's!
            </p>
            <button
              onClick={() => navigate("/store")}
              className='w-fit bg-[#FDC175] border-[#FDC175] border-4 font-bold hover:text-[#A8824F] hover:bg-inherit hover:translate-y-[.5rem] duration-100 py-2 px-4'
            >
              Explore
            </button>
          </div>
          <div className='w-full lg:w-[50vw]'>
            <div className='w-full h-[60vh] lg:h-[70vh] bg-homeBanner bg-no-repeat bg-cover bg-bottom'></div>
            <Link
              to='#map'
              onClick={() => handleClickScroll("map")}
              className='flex items-center gap-2 bg-[#685D6E] mx-auto font-bold text-[1.2rem] text-[#FDC175] hover:text-[#b9894b] duration-100 p-2'
            >
              <TbArrowBigRightLinesFilled className='text-[1.5rem]' /> How to
              find us?
            </Link>
          </div>
        </div>
      </article>
      <article className='flex flex-col gap-6 bg-[#c7b3d2] min-h-[40vh] px-4 py-16'>
        <h2 className='font-silkscreen text-[1.4rem] text-center font-bold'>
          In partnership with local
        </h2>
        <div className='flex justify-around items-center gap-4 p-4'>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={Farmer} alt='Farmer' className='w-[4rem]' />
            <div className='bg-[#1C0D25] group-hover:bg-inherit text-white group-hover:text-[#1C0D25] group-hover:font-bold rounded-full py-2 px-4'>
              <p>Farmers</p>
            </div>
          </div>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={Rancher} alt='Rancher' className='w-[4rem]' />
            <div className='bg-[#1C0D25] group-hover:bg-inherit text-white group-hover:text-[#1C0D25] group-hover:font-bold rounded-full py-2 px-4'>
              <p>Ranchers</p>
            </div>
          </div>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={Business} alt='Farmer' className='w-[4rem]' />
            <div className='bg-[#1C0D25] group-hover:bg-inherit text-white group-hover:text-[#1C0D25] group-hover:font-bold rounded-full py-2 px-4'>
              <p>Businesses</p>
            </div>
          </div>
        </div>
      </article>
      <article className='flex flex-col justify-center items-center bg-[#653736] w-full min-h-[60vh] py-10 '>
        <div className='flex flex-col justify-between gap-4 w-[90vw] lg:w-[60vw]'>
          <div className='self-end flex flex-row-reverse items-center gap-2'>
            <img
              src={seasons.find((s) =>
                s.match(new RegExp(currentSeason, "ig"))
              )}
              alt={`${currentSeason} icon`}
              className='peer'
            />
            <p className='invisible peer-hover:visible duration-100 text-white'>
              It's {currentSeason}!
            </p>
          </div>
          <h2 className='font-silkscreen text-[1.4rem] text-center font-bold text-white mb-6'>
            Best Sellers of the Season
          </h2>
        </div>
        <div className="flex items-center w-[90vw] lg:w-[60vw] min-h-[60vh] overflow-x-scroll snap-x scrollbar-thin scrollbar-thumb-white scrollbar-track-[#7f6666]">
          {bestSellers.length > 0 &&
            bestSellers.map((product, index) => <BestSeller key={index} product={product}/>)}
        </div>
      </article>
      <article className='flex flex-col justify-center items-center bg-white min-h-[50vh] py-10'>
        <h2 className='font-silkscreen text-[1.4rem] text-center font-bold mb-6'>
          A word from the owner
        </h2>
        <div className='flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full lg:w-[60vw]'>
          <img
            src={PierrePortrait}
            alt='Owner portrait'
            className='w-[60vw] lg:w-[35%]'
          />
          <div className='flex flex-col gap-4 w-full lg:w-[50%] p-4'>
            <h3 className='font-bold text-[1.5rem]'>
              Local Business takes guts.
            </h3>
            <p className='text-justify'>
              I have been running The General Store for a long time now. I
              witnessed big corporations trying to monopolize the market in my
              hometown, selling cheap and low-quality products. This not only
              caused ecological problems in the Valley but also brought
              desperation to the foundations of family businesses. However, with
              the support of all the citizens of Stardew Valley, I managed to
              bring prosperity to our local market by partnering with farmers
              and anyone, who is willing to provide top-notch quality goods.
            </p>
            <div>
              <img
                src={PierreSignature}
                alt='Pierre Signature'
                className='w-[30vw] lg:w-[5rem]'
              />
              <p>Pierre, The Pierre's General Store founder</p>
            </div>
          </div>
        </div>
      </article>
      <article className='flex flex-col gap-6 bg-[#c7b3d2] min-h-[40vh] px-4 py-16'>
        <h2 className='font-silkscreen text-[1.4rem] text-center font-bold'>
          Why Pierre's ?
        </h2>
        <div className='flex justify-around items-center gap-4 p-4'>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={FarmFresh} alt='Farmer' className='w-[4rem]' />
            <div className='bg-inherit group-hover:bg-[#1C0D25] text-[#1C0D25] group-hover:text-white font-bold rounded-full py-2 px-4'>
              <p className='text-center'>Farm Fresh</p>
            </div>
          </div>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={Community} alt='Rancher' className='w-[4rem]' />
            <div className='bg-inherit group-hover:bg-[#1C0D25] text-[#1C0D25] group-hover:text-white font-bold rounded-full py-2 px-4'>
              <p className='text-center'>Trusted by the people</p>
            </div>
          </div>
          <div className='group flex flex-col items-center gap-4 cursor-pointer hover:scale-110 duration-300 ease-in'>
            <img src={Cashback} alt='Farmer' className='w-[4rem]' />
            <div className='bg-inherit group-hover:bg-[#1C0D25] text-[#1C0D25] group-hover:text-white font-bold rounded-full py-2 px-4'>
              <p className='text-center'>Cashback policy</p>
            </div>
          </div>
        </div>
      </article>
      <article
        id='map'
        className='flex flex-col justify-center items-center bg-[#653736] min-h-[50vh] py-10'
      >
        <h2 className='font-silkscreen text-[1.4rem] text-center font-bold text-white mb-6'>
          Store's Location
        </h2>
        <p className='text-center text-white mb-3'>
          Stardew Valley, North of Town Square
        </p>
        <div className='relative'>
          <BiMapPin className='absolute right-[39%] top-[40%] md:top-[42%] text-[#880f29] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] animate-pulse' />
          <img src={Map} alt='Map' className='w-[90vw] lg:w-[60vw]' />
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-10 text-white mt-4'>
          <p>Don't hesitate stopping by!</p>
          <p>Open hours: 9am to 5pm</p>
        </div>
      </article>
    </section>
  );
};

export default Home;
