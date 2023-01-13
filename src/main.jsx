import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie/Movie";
import Search from "./pages/Search/Search";
import Home from "./pages/Home/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App/>}>
                    <Route exact path="/" element={<Home />} />
                    <Route path="filme/:id" element={<Movie />} />
                    <Route path="pesquisa" element={<Search />} />
                </Route>   
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
