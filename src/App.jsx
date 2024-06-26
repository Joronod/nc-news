import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Header from '../components/Header';
import Home from '../components/Home';
import AllArticles from '../components/AllArticles';
import SingleArticle from "../components/SingleArticle";
import Users from "../components/Users";
import { UserProvider } from "./UserContext";
import NotFound from "../components/NotFound";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/topics" element={<Home />} />
                        <Route path="/articles" element={<AllArticles />} />
                        <Route path="/articles/:article_id" element={<SingleArticle />} />
                        <Route path="/topics/:topic" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
