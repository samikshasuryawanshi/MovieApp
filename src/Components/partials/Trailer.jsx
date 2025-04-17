import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound'

const Trailer = () => {
    const navigate = useNavigate();
   const {pathname} = useLocation()
   const category = pathname.includes("movie")?"movie":"tv";
   const vd = useSelector(state=> state[category].info.videos)

   console.log(vd);
   
   
  return  (

    <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.9)] '>
         <Link
            onClick={() => navigate(-1)}
            className="ri-close-large-line fixed top-8 right-15 text-3xl hover:text-[#6556CD] cursor-pointer"> 
          </Link>
       {vd ?  <ReactPlayer controls height={700}  width={1080} url={`https://www.youtube.com/watch?v=${vd.key}`} /> : <NotFound />}
    </div>
  )
}

export default Trailer