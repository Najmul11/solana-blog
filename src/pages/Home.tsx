/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-65px)] text-gray-800 flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        {/* Heading */}
        <h1 className="text-3xl tracking-wider md:text-4xl xl:text-5xl font-extrabold animate-fade-in">
          Decentralized Blog <br className="max-sm:hidden" /> For True Freedom
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-sm md:text-lg  text-gray-700 leading-relaxed animate-fade-up">
          Share your voice without boundaries, censorship, or central control.
          Join the movement toward truly free speech.
        </p>

        {/* Call to Action */}
        <div className="space-x-4">
          <Link
            to={"/blogs"}
            className="  text-white font-semibold px-6 !py-3 rounded-md shadow-lg hover:bg-black bg-[#512DA8] duration-300 "
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
