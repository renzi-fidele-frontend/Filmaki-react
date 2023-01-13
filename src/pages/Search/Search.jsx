import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";
import MovieCard from "../../Components/MovieCard/MovieCard";

const urlSearch = import.meta.env.VITE_SEARCH;
const apikey = import.meta.env.VITE_API_KEY;

function Search() {
    const [q] = useSearchParams();
    

    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

    //  Apanhando os resultados da pesquisa
    async function apanhar() {
        const data = await fetch(`${urlSearch}?query=${q.get('q')}&language=pt-BR&api_key=${apikey}`)
            .then((rsp) => rsp.json())
            .then((r) => setResultadosPesquisa(r.results))
            .catch((err) => console.log(`Ops, aconteceu o erro: ${err}`));
    }

    useEffect(() => {
        apanhar()
    }, [q]);

    return (
        <section>
            <h1 id={styles.tit}>Resultados da pesquisa</h1>
            {/*Mostrando os resultados da pesquisa caso hajam*/}
            {resultadosPesquisa.length === 0 ? (
                <p>Sem nada a mostrar</p>
            ) : (
                <div className={styles.filmesContainer}>
                    {resultadosPesquisa.map((obj) => {
                        return <MovieCard movie={obj} mostrarLink={false} />;
                    })}
                   
                </div>
            )}
        </section>
    );
}

export default Search;
