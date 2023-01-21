import styles from "./MovieCard.module.css";
import { ImStarFull } from "react-icons/im";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//  Apanhando o link para get de imagem no ambiente do VITE
const img_url = import.meta.env.VITE_IMG;

function MovieCard({ movie, mostrarLink = true }) {
    return (
        <div id={styles.cardContainer}>
            <motion.img src={img_url + movie.poster_path} alt={movie.title} whileHover={{filter: "grayscale(100%)"}} />
            <h2>{movie.title}</h2>
            <p>
                {<ImStarFull color="yellow" />}
                {movie.vote_average}
            </p>
            <div id={styles.todo}>
                {mostrarLink === true ? (
                    <Link className={styles.link} to={`filme/${movie.id}`}>
                        Detalhes
                    </Link>
                ) : (
                    <Link className={styles.link} to={`../filme/${movie.id}`}>
                        Detalhes
                    </Link>
                )}
            </div>
        </div>
    );
}

export default MovieCard;
