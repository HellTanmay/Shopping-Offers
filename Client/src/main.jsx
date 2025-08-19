
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Route,Routes}from "react-router"
import AddPost from './Posts/AddPost.jsx'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path='/addPost' element={<AddPost/>}/>

    </Routes>
    </BrowserRouter>
  </StrictMode>
);
