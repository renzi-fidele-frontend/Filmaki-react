import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Generos.module.css";
import estilo from "../Home/Home.module.css";

//  Pegando os dados da api no ambiente
const apiKey = import.meta.env.VITE_API_KEY;
const generoUrl = import.meta.env.VITE_GENDER_URL;

const Generos = () => {
    const [categorias, setCategorias] = useState([]);
    const navegar = useNavigate();
    

    async function apanharCategorias(url) {
        const res = await fetch(url)
            .then((val) => val.json())
            .then((val) => setCategorias(val.genres))
            .catch((err) => console.log(`Ops, aconteceu o erro: ${err}`));
    }

    //  Pegando as categorias
    useEffect(() => {
        apanharCategorias(`${generoUrl}?api_key=${apiKey}&language=pt-BR`);
    }, []);

    return (
        <section id={styles.container}>
            <h3>Escolha a sua categoria favorita</h3>

            <div id={styles.CategoriasContainer}>
                {/*Caso hajam categorias a se mostrar */}
                {categorias.length > 0 ? (
                    categorias.map((val, key) => {
                        return (
                            <p
                                onClick={() => {
                                    navegar(`${val.id}`, { state: { message: `${val.name}` } });
                                }}
                            >
                                {val.name}
                            </p>
                        );
                    })
                ) : (
                    <AiOutlineLoading3Quarters id={estilo.ico} />
                )}
            </div>
        </section>
    );
};

export default Generos;
