import styles from "./NotFound.module.css"
import foto from "../../assets/undraw_location_search_re_ttoj.svg"
import { motion } from "framer-motion"

const NotFound = () => {
  return (
    <section id={styles.container}>
        <motion.img initial={{x: "-100vh"}} transition={{duration: 0.5}} animate={{x: 0}} src={foto} alt="imagem de erro" />
        <h4>404</h4>
        <p>Página não encontrada</p>
    </section>
  )
}

export default NotFound