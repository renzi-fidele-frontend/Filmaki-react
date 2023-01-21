import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { MdDownloading } from "react-icons/md";
import MovieCard from "../../Components/MovieCard/MovieCard.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

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
        <motion.section id={styles.container} initial={{x: "-100vh"}} animate={{x: 0}} transition={{duration: 1}}>
            <h1>
                Veja as tendências no mundo do cinema
            </h1>
            {/*Caso tenho algum filme no array */}
            {topFilmes.length === 0 ? (
                <AiOutlineLoading3Quarters id={styles.ico} />
            ) : (
                <div id={styles.topFilmesContainer}>
                    {topFilmes.map((obj) => {
                        return <MovieCard movie={obj} />;
                    })}
                </div>
            )}
        </motion.section>
    );
}

export default Home;
