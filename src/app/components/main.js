"use client";

import { IoMdSearch } from "react-icons/io";
import { MdOutlineVideogameAsset } from "react-icons/md";

import { useEffect, useState } from "react";

export default function Main() {

    const [search, setSearch] = useState("");
    const [heading, setHeading] = useState(null);

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGames() {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch("https://api.rawg.io/api/games?key=18125da833a947b396bc98eae3ac2a82&page_size=12")
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data = await response.json();
                setGames(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); 
            } 
        }
        fetchGames();
    }, []);

    async function handleSearch(e) {
        e.preventDefault();
        if (search.trim() === "") {
            try {
                const response = await fetch("https://api.rawg.io/api/games?key=18125da833a947b396bc98eae3ac2a82&page_size=12")
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data = await response.json();
                setGames(data.results);
                setHeading(null)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); 
            } 
            return;
        }
        setGames([])
        setLoading(true)
        setError(false)
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=18125da833a947b396bc98eae3ac2a82&search=${search}`)
            if (!response.ok) {
                throw new Error("Failed to fetch games")
            }
            const data = await response.json()
            setGames(data.results)
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
        setHeading(`Search results for: ${search}`);
        setSearch("");
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}.${month}.${year}`;
        }

    return (
        <section id="main" className="flex flex-col items-center justify-start min-h-screen w-full text-center text-white bg-[#121212]">
            <div className="w-full p-6 bg-[#1e1e1e] shadow-lg flex items-center justify-center">
                <form className="flex flex-row items-center justify-center w-5/6 gap-2" onSubmit={handleSearch}>
                    <input className="px-4 py-1 bg-gray-800 rounded-lg shadow-lg outline-none border-1 border-transparent focus:border-indigo-800 transition-all duration-150" placeholder="Search for a game..." onChange={(e) => setSearch(e.target.value)} value={search} ></input>
                    <button className="px-4 py-1 bg-indigo-800 rounded-lg shadow-lg hover:bg-indigo-900 transition-colors duration-150"><IoMdSearch className="text-2xl" /></button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-start w-5/6 mt-6">
                {heading ? <h1 className="self-start font-bold text-2xl flex gap-4 items-center">{heading}</h1>: <h1 className="self-start font-bold text-2xl flex gap-4 items-center">Popular Games <MdOutlineVideogameAsset className="text-3xl" /></h1>}
                {loading && "Loading..."}
                {error && <p className="text-red-500">{error}</p>}
                <ul className="w-full mt-4 space-y-4 flex flex-wrap items-start justify-start gap-8">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <li key={index} className="p-4 bg-[#232323] rounded-lg shadow-md mb-4 flex flex-col items-start justify-between w-full md:w-1/2 lg:w-1/3 xl:w-3/13 min-h-87">
                                <div className="flex flex-col items-start justify-start">
                                    <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover rounded-lg mt-2" />
                                    <h1 className="font-semibold mt-2 text-lg text-left">{game.name}</h1>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <p className="text-gray-400">{game.released !== null ? formatDate(game.released) : 'Release not found'}</p>
                                    <p>{game.rating ? <span className="text-yellow-500">{"★".repeat(Math.round(game.rating))}</span> : "Rating not found"} </p>
                                </div>
                            </li>
                        ))
                    )  : (
                        <p className={loading === false ? 'block' : 'hidden'}>No games found.</p>
                    )}
                </ul>
            </div>
        </section>
    )
}