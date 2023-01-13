import styles from "./Movie.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import { BsGraphUp } from "react-icons/bs";
import { IoIosWallet } from "react-icons/io";
import { AiFillClockCircle } from "react-icons/ai";
import { MdDescription } from "react-icons/md";

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
            .then((ob) => setMovie(ob))
            .catch((err) => console.log(`ops, aconteceu o erro: ${err}`));
    }

    useEffect(() => {
        apanhar();
        console.log(movie);
    }, [id]);

    return (
        <section id={styles.container}>
            <img id={styles.img} src={img_url + movie.poster_path} alt={movie.title} />
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
}

export default Movie;
