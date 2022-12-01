import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import  AddAuteur  from "./Components/AddAuteur";
import  AddGenre  from "./Components/AddGenre";
import  Login  from "./Components/Login";
import  Register  from "./Components/SignUp";
import "./bootstrap.min.css";
import HomePage from './Components/HomePage';
import Books from './Livres';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/auteur' element={<AddAuteur/>}/>
          <Route path='/genre' element={<AddGenre/>}/>
          <Route path='/livres' element={<Books/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
       <Link to="/auteur" className='btn btn-success'>Ajouter un auteur</Link>
       <Link to="/genre" className='btn btn-success'>Ajouter un genre</Link>
       <Link to="/livres" className='btn btn-success'>Ajouter un livre</Link>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
