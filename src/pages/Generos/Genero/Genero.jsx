import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./Genero.module.css";
import estilo from "../../Home/Home.module.css";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MovieCard from "../../../Components/MovieCard/MovieCard";

const urlCategoria = import.meta.env.VITE_DISCOVER_URL;
const api_key = import.meta.env.VITE_API_KEY;

const Genero = () => {
    const { id } = useParams();
    const location = useLocation().state.message;
    const [resultados, setResultados] = useState([]);

    //  Apanhando os filmes da categoria selecionada
    async function apanharRelacionados(id) {
        const res = await fetch(`${urlCategoria}?api_key=${api_key}&with_genres=${id}&language=pt-BR`)
            .then((val) => val.json())
            .then((val) => setResultados(val.results))
            .catch((err) => console.log(`ops, aconteceu o erro: ${err}`));
    }

    useEffect(() => {
        apanharRelacionados(id);
    }, []);

    return (
        <motion.section id={estilo.container} initial={{ x: "-100vh" }} animate={{ x: 0 }} transition={{ duration: 1 }}>
            <h2>Veja os filmes de {location}</h2>
            {/*Caso tenho algum filme no array */}
            {resultados.length === 0 ? (
                <AiOutlineLoading3Quarters id={estilo.ico} />
            ) : (
                <div id={estilo.topFilmesContainer}>
                    {resultados.map((obj, key) => {
                        return <MovieCard movie={obj} mostrarLink={false} />;
                    })}
                </div>
            )}
        </motion.section>
    );
};

export default Genero;
