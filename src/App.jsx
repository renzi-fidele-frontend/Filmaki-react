import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
