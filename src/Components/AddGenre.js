import { React, useState } from "react";
import "../bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddGenre =()=> {
    const [genre, setGenre] =useState({
        category:""
    })
  
    const handleChange=(event)=> {
      setGenre((prev)=>({...prev,[event.target.name]:event.target.value}))
    };
    const navigate = useNavigate()
    const handleSubmit = async event=> {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/api/genre",genre)
        navigate('/genres')
      } catch (error) {
        window.alert(error)
      }
    };
  
    
      return (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <fieldset>
                <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Genre</label>
                </div>
                <div className="form-group">
                <label for="exampleInputEmail1">Categorie</label>
                <input type="text" className="form-control" name="category" onChange={handleChange} placeholder="Enter category"  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
        </div>
        
      );
    }
  export default AddGenre;