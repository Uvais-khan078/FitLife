import { Link } from 'react-router-dom';

function Errorpage() {
  return (
    <div className="flex flex-col min-h-screen bg-red-500">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="text-6xl font-bold text-white">404 Page Not Found</h1>

        <Link to="/home">
          <button className="mt-4 px-6 py-3 bg-white text-red-500 font-semibold rounded-xl shadow hover:bg-gray-100 transition duration-300">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Errorpage;
