import { Link } from "react-router-dom";
import noImage from '/noImage.jpg'
const HorizontalCards = ({data}) => {
    
    return (
            <div className="w-full  h-fit flex overflow-x-auto">
               { data.length > 0 ? data.map((d,i)=>{
                return(
                <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[19%] h-[45vh] bg-[#1b1a20] p-3 rounded-xl mr-2 mb-2">
                   <img className="h-[25vh] w-full object-cover rounded" src={
                     d.backdrop_path || d.poster_path?
                     `https://image.tmdb.org/t/p/w500/${d.backdrop_path || d.poster_path}`:noImage
                  } alt="" />
                  <h1 className="text-white text-lg mt-4 font-semibold">
                      {d.title || d.name || d.original_title || d.original_name}
                   </h1>
                   
                   <p className="text-zinc-200 text-sm mt-1">
                      { d.overview.slice(0,50)}... <span className="text-zinc-400">more</span>
                   </p>
               </Link>
                )
               }):<h1 className="text-2xl text-white font-medium text-center">Nothing to show</h1>}

            </div>
    )
}

export default HorizontalCards;