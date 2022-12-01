import axios from 'axios';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const Update = () =>{
    const navigate = useNavigate()
    const [book, setBook] = useState({
        titre : "",
        description : "",
        prix : null,
        couverture : "",
    });
    return (
        <div className="container">
            <h1>Mettre à jour un livre</h1>
            <div class="form-group">
                <label for="titre">Titre:</label>
                <input type={"text"} placeholder="Titre" className="form-control" name="titre"   />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <input type={"text"} placeholder="Description" className="form-control" name="description" />
            </div>
            <div class="form-group">
                <label for="prix">Prix:</label>
                <input type={"number"} placeholder="Prix" className="form-control" name="prix" />
            </div>
            <div class="form-group">
                <label for="couverture">Description:</label>
                <input type={"file"} placeholder="Image de couverture" className="form-control" name="couverture" />
            </div>
            <button  className="btn btn-primary">Confirmer</button>
        
        </div>
    )
}
export default Update