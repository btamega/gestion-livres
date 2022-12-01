import React, { Component } from 'react'
import axios from "axios";

export default class SignUp extends Component {
    constructor() {
        super();
        
    }
    user = {
        firstName:"",
        lastName:"",
        email:"",
    };
  render() {
    
    const handleChange=(event)=> {
        this.setState((prev)=>({...prev,[event.target.name]:event.target.value}))
      };
      const handleSubmit = async event=> {
        event.preventDefault();
        try {
          await axios.post("http://localhost:3001/api/user",this.user).then(response=>{
            const token  =  response.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            this.props.navigate('/login')
          })
        } catch (error) {
          window.alert(error)
        }
      };
    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name" onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email" onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password" onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}