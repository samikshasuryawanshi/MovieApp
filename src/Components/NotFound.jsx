import { useNavigate } from 'react-router-dom';
import notFound from '/404-pages.jpg'
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex relative justify-center overflow-hidden items-center bg-black">
        <img className='h-[140vh]' src={notFound} alt="" />
        <i 
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line absolute text-white left-10 top-10 text-5xl cursor-pointer"> 
          </i>
    </div>
  )
}

export default NotFound