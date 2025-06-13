"use client"

import { useEffect, useState, use } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function DetailGame({ params }) {
    const router = useRouter();
    const { id } = use(params);

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGame() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://api.rawg.io/api/games/${id}?key=18125da833a947b396bc98eae3ac2a82`);
                if (!res.ok) throw new Error("Failed to fetch game details");
                const data = await res.json();
                setGame(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchGame();
    }, [id]);

    function formatDate(dateString) {
        if (!dateString) return "Release not found";
        const [year, month, day] = dateString.split("-");
        return `${day}.${month}.${year}`;
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-start w-full text-white bg-[#121212]">
            <div className="w-full p-6 bg-[#1e1e1e] shadow-lg flex items-center">
                <button
                    className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors"
                    onClick={() => router.push("/")}
                >
                    <FaArrowLeft className="text-xl" />
                    <span>Back</span>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full mt-8">
                {loading && <p className="text-gray-400">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {game && (
                    <div className="bg-[#232323] rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full md:w-1/2 h-72 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <h1 className="font-bold text-3xl flex items-center gap-3 text-left">
                                    {game.name}
                                    <MdOutlineVideogameAsset className="text-2xl text-indigo-400" />
                                </h1>
                                <p className="text-gray-400 mt-2">{formatDate(game.released)}</p>
                                <p className="mt-2">
                                    {game.rating ? (
                                        <span className="text-yellow-500 text-xl">
                                            {"★".repeat(Math.round(game.rating))}
                                            {"☆".repeat(5 - Math.round(game.rating))}
                                        </span>
                                    ) : (
                                        "Rating not found"
                                    )}
                                    <span className="ml-2 text-gray-400 text-sm">
                                        ({game.ratings_count} ratings)
                                    </span>
                                </p>
                                <p className="mt-4 text-gray-300 text-base leading-relaxed">
                                    {game.description_raw || "No description available."}
                                </p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4">
                                {game.genres && game.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="bg-indigo-800 text-xs px-3 py-1 rounded-full text-white"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}