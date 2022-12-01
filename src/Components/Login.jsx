import React, { Component } from 'react'
import '../index.css';
import axios from "axios";

export default class Login extends Component {
     handleChange=(event)=> {
        this.setState((prev)=>({...prev,[event.target.name]:event.target.value}))
      };
       handleSubmit = async event=> {
        event.preventDefault();
        try {
          await axios.post("http://localhost:3001/api/user",this.user)
          this.props.navigate('/')
        } catch (error) {
          window.alert(error)
        }
      };
  render() {
    return (
        <div className='container'>
            <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email" onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password" onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1" onChange={this.handleChange}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
        </div>
      
    )
  }
}