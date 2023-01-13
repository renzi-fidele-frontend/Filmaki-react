import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { MdDownloading } from "react-icons/md";
import MovieCard from "../../Components/MovieCard/MovieCard.jsx";

//  Pegando os dados da API no ambiente do vite
const apiUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
    //  Top Filmes mais classificados
    const [topFilmes, setTopFilmes] = useState([]);

    //  Apanhando os Top filmes
    async function apanharTopFilmes(url) {
        const res = await fetch(url)
            .then((r) => r.json())
            .then((r) => setTopFilmes(r.results))
            .catch((err) => console.log(`Ops, aconteceu o erro: ${err}`));
    }

    useEffect(() => {
        apanharTopFilmes(`${apiUrl}top_rated?api_key=${apiKey}&language=pt-BR`);
    }, []);

    return (
        <section id={styles.container}>
            <h1 style={{ textAlign: "center", marginBottom: "1em", fontWeight: "600", fontSize: "32px", fontStyle: "italic" }}>
                Veja as tendências no mundo do cinema
            </h1>
            {/*Caso tenho algum filme no array */}
            {topFilmes.length === 0 ? (
                <MdDownloading />
            ) : (
                <div id={styles.topFilmesContainer}>
                    {topFilmes.map((obj) => {
                        return <MovieCard movie={obj} />;
                    })}
                </div>
            )}
        </section>
    );
}

export default Home;
