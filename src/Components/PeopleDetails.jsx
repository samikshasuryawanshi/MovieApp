import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import { asyncloadPeople ,removePeople } from "../store/actions/peopleActions";
import DropDown from "./partials/DropDown";
const PeopleDetails = () => {
   const {pathname} = useLocation();
    const navigate = useNavigate();
    //useParams is used to get the parameters from the url
    //useDispatch is used to dispatch the actions to the store
    //useEffect is used to perform side effects in functional components
    const {id} = useParams();
    const {info} = useSelector((state) => state.people);
    const dispatch = useDispatch();

    const [catgeory, setcatgeory] = useState("movie");
  
    // console.log(info);
    
    useEffect(() => {
      dispatch(asyncloadPeople(id));
      return () => {
        dispatch(removePeople())
      }
    },[id])



  return info ? 
    <div className="h-fit w-full  px-20">
       <nav className="w-full h-[10vh] fixed z-10 bg-[#1F1E24]  text-zinc-200 flex items-center gap-10">
          <i 
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-3xl hover:text-[#6556CD] cursor-pointer"> 
          </i>
          {/* <a target="_blank" href={info.detail.homepage}>
            <i class="hover:text-[#6556CD] text-2xl ri-external-link-fill"></i>
          </a>
          <a target="_blank" href={`https://www.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className="text-2xl ri">
            <i class=" hover:text-[#6556CD] text-2xl ri-earth-fill"></i>
          </a>
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className="hover:text-[#6556CD] text-xl ri">
            IMDB
          </a> */}
        </nav>


          {/* Part 2 left poster and details */}
        <div className="w-full mt-20 flex gap-15">
          <div className="h-fit w-[40vh] p-4 overflow-hidden cursor-pointer rounded-lg relative">
                <img 
                  className="w-[40vh] shadow-2xl object-cover rounded-lg" 
                  src={`https://image.tmdb.org/t/p/w500/${info.detail.profile_path || info.detail.backdrop_path }`} 
                  alt={info.detail.name || info.detail.title || info.detail.original_name}
                />
                <hr className="mt-5 bg-zinc-400 mb-3" />
                <div className="flex gap-4 items-center justify-center  text-white">
                    <a target="_blank" href={`https://www.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className="text-2xl ri">
                      <i class=" hover:text-[#6556CD] text-2xl ri-earth-fill"></i>
                    </a>
                    <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`} className="text-2xl ri">
                      <i class=" hover:text-[#6556CD] text-2xl ri-facebook-circle-fill"></i>
                    </a>
                    <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`} className="text-2xl ri">
                      <i class=" hover:text-[#6556CD] text-2xl ri-instagram-fill"></i>
                    </a>
                    <a target="_blank" href={`https://www.twitter.com/${info.externalid.twitter_id}`} className="text-2xl ri">
                      <i class=" hover:text-[#6556CD] text-2xl ri-twitter-x-fill"></i>
                    </a>
                </div>


                <h1 className="mt-5 text-xl text-zinc-200">Personal Information - </h1>
                <h1 className="mt-2  italic text-zinc-300">known for {info.detail.known_for_department}</h1>
                <h1 className="mt-1 italic text-zinc-300">Birthday : {info.detail.birthday}</h1>
                <h1 className="mt-1 italic text-zinc-300">Gender : {info.detail.gender === 1 ? "Female ": "Male"}</h1>
                <h1 className="mt-1 italic text-zinc-300">Deathday : {info.detail.deathday ? info.detail.deathday : "Still Alive" }</h1>
                <h1 className="mt-1 italic text-zinc-300">Place of Birth : {info.detail.place_of_birth}</h1>
          </div>

          <div className="w-[75%] p-4 flex flex-col">
            <h1 className="text-5xl  text-zinc-300 font-black">{info.detail.name}</h1>
            <p className="italic text-lg mt-8 text-zinc-300"><span className="font-semibold">BIOGRAPHY </span>: {info.detail.biography.slice(0,1050)}...<span className="text-blue-500">more</span> </p>
            <h1 className="text-lg italic mt-8 mb-4 text-zinc-300 font-black"><span className="font-semibold ">WORK SUMMARY </span>: </h1>
            <HorizontalCards data={info.combineCredits.cast} />
             

          </div>    
       </div>

       <div className="w-full h-fit p-5 mt-2 mb-5 flex flex-col justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl text-zinc-300 font-semibold">Acting</h1>
          <DropDown title="Category" otpions={["tv","movie"]} func={(e) => setcatgeory(e.target.value)} />
        </div>

        <div className="w-full text-zinc-300  list-disc h-[45vh] p-5 mt-2 rounded shadow-2xl bg-[#1b1a20] overflow-x-hidden overflow-y-auto">
           {info[catgeory + "Credits"].cast.map((c,i)=>(
             <li key={i} className="hover:text-white h-fit p-2 mt-2 bg-[#1e1d24] hover:bg-[#1b1a20] rounded duration-300 cursor-pointer w-full">
                <Link to={`/${catgeory}/details/${c.id}`} className="text-xl">
                  <span className="capitalize">{c.name || c.title || c.original_name}</span>
                  <span className="block text-sm mt-1 italic ml-6">
                    {c.character ? "Character" : "Role"} : {c.character || c.job}
                  </span>
                </Link>
               
            </li>
           ))}
        </div>
      </div>  
</div>
  :<Loading />;
};

export default PeopleDetails;