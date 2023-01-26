import styles from "./Movie.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import { BsGraphUp } from "react-icons/bs";
import { IoIosWallet } from "react-icons/io";
import { AiFillClockCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { motion } from "framer-motion";
import estilo from "../Home/Home.module.css";

//  Apanhando o link para get de imagem no ambiente do VITE
const img_url = import.meta.env.VITE_IMG_POSTER;
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API;

function Movie() {
    //  Apanhando a id do filme
    const { id } = useParams();

    //  Pegando o objecto do filme
    const [movie, setMovie] = useState({});

    //  Apanhando o filme pela id
    async function apanhar() {
        const data = await fetch(`${apiUrl}${id}?api_key=${apiKey}&language=pt-BR`)
            .then((obj) => obj.json())
            .then((ob) => {
                console.log(ob);
                setMovie(ob);
            })
            .catch((err) => console.log(`ops, aconteceu o erro: ${err}`));
    }

    useEffect(() => {
        apanhar();
    }, [id]);

    //  Caso chegue a informação do filme vindo da api
    if (Object.keys(movie).length > 0) {
        return (
            <section id={styles.container}>
                <motion.img
                    id={styles.img}
                    src={img_url + movie.poster_path}
                    whileHover={{filter: "grayscale(100%)"}}
                    alt={movie.title}
                    initial={{ x: "-100vh", opacity: 0 }}
                    transition={{ duration: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                />
                <h3>{movie.title}</h3>
                <p id={styles.rating}>
                    <ImStarFull color="yellow" />
                    {parseFloat(movie.vote_average).toFixed(1)}
                </p>
                <p id={styles.tagline}>{movie.tagline}</p>

                <div id={styles.esquerda}>
                    <div className={styles.bloco}>
                        <p>
                            <IoIosWallet color="orange" /> Orçamento:
                        </p>
                        <span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(movie.budget)}</span>
                    </div>

                    <div className={styles.bloco}>
                        <p>
                            <BsGraphUp color="orange" /> Receita:
                        </p>
                        <span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(movie.revenue)}</span>
                    </div>

                    <div className={styles.bloco}>
                        <p>
                            <AiFillClockCircle color="orange" /> Duração:
                        </p>
                        <span>{movie.runtime} Minutos</span>
                    </div>

                    <div className={styles.bloco}>
                        <p>
                            <MdDescription color="orange" /> Descrição:
                        </p>
                        <span>{movie.overview}</span>
                    </div>
                </div>
            </section>
        );
    } else {
        return <AiOutlineLoading3Quarters id={estilo.ico} />
    }
}

export default Movie;
