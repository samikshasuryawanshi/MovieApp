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
function App() {
 return(
    <div className='bg-[#1F1E24] flex overflow-y-auto overflow-x-hidden h-screen w-screen text-white'>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/trending" element={<Trending/>}></Route>
            <Route path="/popular" element={<Popular/>}></Route>
            <Route path="/movie/" element={<Movie/>}></Route>
            <Route path="/tvshow/" element={<TvShow/>}></Route>
            <Route path="/people/" element={<People/>}></Route>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/contactus" element={<ContactUs/>}></Route>
        </Routes>
    </div>
 )
}

export default App
