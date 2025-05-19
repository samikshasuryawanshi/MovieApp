import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#1F1E24] text-white px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-[#6556CD] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-zinc-400 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the previous page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#6556CD] hover:bg-[#574bc3] transition px-6 py-3 rounded-full text-white font-medium"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
