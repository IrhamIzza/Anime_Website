import { use, useEffect, useState } from "react";   
export default function Home() {
    const [anime, setAnime] = useState([]);
    const [anime2, setAnime2] = useState([]);

    async function getData() {
        const response = await fetch("https://api.jikan.moe/v4/anime/top/tv?limit=10"); 
        const data = await response.json();
        setAnime(data.data);
    }

    async function getData2() {
        const response = await fetch("https://api.jikan.moe/v4/anime/top/movie?limit=10"); 
        const data = await response.json();        
    }

    useEffect(() => {
        getData();
        getData2();
    }, []);

    return (
        <>
            <h1 className="">Home</h1>
        </>
    )
}