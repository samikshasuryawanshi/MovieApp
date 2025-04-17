import './main.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Trending from './Components/Trending.jsx'
import Popular from './Components/Popular.jsx'
import Movie from './Components/Movie.jsx'
import TvShow from './Components/TvShow.jsx'
import People from './Components/People.jsx'
import AboutUs from './Components/partials/AboutUs.jsx'
import ContactUs from './Components/partials/ContactUs.jsx'
import MovieDetails from './Components/MovieDetails.jsx'
import TvDetails from './Components/TvDetails.jsx'
import PeopleDetails from './Components/PeopleDetails.jsx'
import Trailer from './Components/partials/Trailer.jsx'
import NotFound from './Components/NotFound.jsx'


function App() {
 return(
    <div className='bg-[#1F1E24] flex overflow-y-auto overflow-x-hidden h-screen w-screen text-white'>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/trending" element={<Trending/>}></Route>
            <Route path="/popular" element={<Popular/>}></Route>
            <Route path="/movie" element={<Movie/>} />
            <Route path="/movie/details/:id" element={<MovieDetails/>}>
               <Route path='/movie/details/:id/trailer' element={<Trailer />}></Route>
            </Route>
            <Route path="/tv" element={<TvShow/>} />
            <Route path="/tv/details/:id" element={<TvDetails/>}>
                <Route path='/tv/details/:id/trailer' element={<Trailer />}></Route>
            </Route>
            <Route path="/person" element={<People/>} />
            <Route path="/person/details/:id" element={<PeopleDetails/>}></Route>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/contactus" element={<ContactUs/>}></Route>
            <Route path='*' element={<NotFound />}></Route>
        </Routes>
    </div>
 )
}

export default App
