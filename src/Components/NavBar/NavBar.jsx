import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaCameraRetro, FaSearch } from "react-icons/fa";
import { useState } from "react";

function NavBar() {
    const [pesquisa, setPesquisa] = useState("");
    const navegar = useNavigate();

    return (
        <nav id={styles.nav}>
            <div id={styles.flex}>
                <h1 style={{ letterSpacing: "3px", fontWeight: "900" }}>
                    <Link to="/">
                        <FaCameraRetro /> FilmeLib
                    </Link>
                </h1>
                <Link to="/generos">Categorias</Link>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    navegar(`pesquisa?q=${pesquisa}`);
                }}
            >
                <input
                    type="text"
                    required
                    name="q"
                    placeholder="Busque um filme"
                    id="q"
                    onChange={(e) => {
                        setPesquisa(e.target.value);
                    }}
                />
                <button onClick={() => {}}>
                    <FaSearch />
                </button>
            </form>
        </nav>
    );
}

export default NavBar;
