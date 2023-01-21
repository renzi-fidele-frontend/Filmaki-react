import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import estilo from "../Home/Home.module.css";

const urlSearch = import.meta.env.VITE_SEARCH;
const apikey = import.meta.env.VITE_API_KEY;

function Search() {
    const [q] = useSearchParams();

    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

    const [erroPesquisa, setErroPesquisa] = useState(false);

    //  Apanhando os resultados da pesquisa
    async function apanhar() {
        setResultadosPesquisa([]);
        const data = await fetch(`${urlSearch}?query=${q.get("q")}&language=pt-BR&api_key=${apikey}`)
            .then((rsp) => rsp.json())
            .then((r) => setResultadosPesquisa(r.results))
            .catch((err) => {
                setErroPesquisa(true);
                console.log(`Ops, aconteceu o erro: ${err}`);
                setTimeout(() => {
                    setErroPesquisa(false);
                }, 3000);
            });
    }

    useEffect(() => {
        apanhar();
    }, [q]);

    return (
        <section>
            <h1 id={styles.tit}>Resultados da pesquisa</h1>
            {/*Mostrando os resultados da pesquisa caso hajam*/}
            {resultadosPesquisa.length === 0 ? (
                <AiOutlineLoading3Quarters id={estilo.ico} />
            ) : (
                <div className={styles.filmesContainer}>
                    {resultadosPesquisa.map((obj) => {
                        if (obj.poster_path) {
                            return <MovieCard movie={obj} mostrarLink={false} />;
                        } else {
                            undefined;
                        }
                    })}
                </div>
            )}

            {/*Caso haja erro do servidor ao se fazer uma pesquisa */}
            {erroPesquisa === true ? <p style={{ color: "red", fontSize: "20px" }}>Por favor desative a segurança do navegador</p> : undefined}
        </section>
    );
}

export default Search;
