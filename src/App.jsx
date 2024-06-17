import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Header from '../components/Header';
import Home from '../components/Home';
import AllArticles from '../components/AllArticles';
import SingleArticle from "../components/SingleArticle";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<AllArticles />} />
                    <Route path="/articles/:article_id" element={<SingleArticle />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
