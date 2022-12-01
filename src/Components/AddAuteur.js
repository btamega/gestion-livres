import { React, useState } from "react";
import "../bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddAuteur =()=> {
    const [auteur, setAuteur] =useState({
        category:"",
        lastName:"",
        firstName:"",
        statut:""
    })
  
    const handleChange=(event)=> {
      setAuteur((prev)=>({...prev,[event.target.name]:event.target.value}))
    };
    const navigate = useNavigate()
    const handleSubmit = async event=> {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/api/auteur",auteur)
        navigate('/auteurs')
      } catch (error) {
        window.alert(error)
      }
    };
  
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            LastName:
            <input type="text" className="form-control"  onChange={handleChange} />
          </label>
          <label>
            FirstName:
            <input type="text" className="form-control"  onChange={handleChange} />
          </label>
          <label>
            Statut:
            <input type="text" className="form-control"  onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  export default AddAuteur;