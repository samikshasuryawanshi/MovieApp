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
   
   
  return (
  <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.9)] z-50 px-2 sm:px-8">
    <Link
      onClick={() => navigate(-1)}
      className="ri-close-large-line fixed  right-4 sm:top-25 sm:right-8 text-3xl sm:text-4xl hover:text-[#6556CD] cursor-pointer z-50"
    ></Link>
    {vd ? (
      <div className="w-full max-w-3xl aspect-video flex items-center justify-center">
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${vd.key}`}
          style={{ borderRadius: '1rem', overflow: 'hidden' }}
        />
      </div>
    ) : (
      <NotFound />
    )}
  </div>
)
}

export default Trailer