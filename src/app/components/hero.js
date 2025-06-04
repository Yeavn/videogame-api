import { CiLocationArrow1 } from "react-icons/ci";


export default function Hero() {
    return (
        <div className="h-screen w-full hero flex items-center justify-center">
            <div className="flex flex-col bg-black/80 items-center justify-center h-full w-full text-center text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome to</h1>
                <h1 className="text-5xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] mb-8">Videogames Database</h1>
                <p className="text-lg mb-8 w-4/5">Explore your favorite games and discover new ones!</p>
                <a className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex flex-row items-center justify-center gap-2" href="#main">
                    <CiLocationArrow1 /> <p>Get Started </p>
                </a>
            </div>
        </div>
  );
}