import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer id={styles.footer}>
        <p><span>FilmeLib</span> © Copyright 2023</p>
        <div>
            <p>Desenvolvedor: </p>
            <a href="https://anovafase.com/renzi-fidele">Renzi Fidele</a>
        </div>
    </footer>
  )
}

export default Footer