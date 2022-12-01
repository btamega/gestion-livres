import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
const Add = () =>{
  
const navigate = useNavigate()
    const [book, setBook] = useState({
        titre : "",
        description : "",
        prix : null,
        couverture : "",
    });
    const handleClick = async e =>{
       
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books",book)
            navigate("/")
        } catch (error) {
            window.alert(error)
        }
    }
    const handleChange =(e) =>{
        setBook((prev) =>({...prev, [e.target.name]: e.target.value}));
    }
    return (
        <div className="container">
            
            <h1>Ajouter un nouveau livre</h1>
            <div class="form-group">
                <label for="titre">Titre:</label>
                <input type={"text"} placeholder="Titre" className="form-control" onChange={handleChange} name="titre"  />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <input type={"text"} placeholder="Description" className="form-control" onChange={handleChange} name="description" />
            </div>
            <div class="form-group">
                <label for="prix">Prix:</label>
                <input type={"number"} placeholder="Prix" className="form-control" onChange={handleChange} name="prix" />
            </div>
            <div class="form-group">
                <label for="couverture">Description:</label>
                <input type={"file"} placeholder="Image de couverture" className="form-control" onChange={handleChange} name="couverture" />
            </div>
            <button onClick={handleClick} className="btn btn-primary">Confirmer</button>
        
        </div>
        
    )
}
export default Add