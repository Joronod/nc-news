import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Header from '../components/Header';
import Home from '../components/Home';
import AllArticles from '../components/AllArticles';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<AllArticles />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
