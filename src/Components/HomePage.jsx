import React from 'react'
import '../bootstrap.min.css'
import '../App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Books from '../Livres'
function HomePage() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">TAMEGA Bougary</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
                <li className="nav-item active">
                <Link className="nav-link" to={'livres'}>Livres
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={'auteurs'}>Auteurs</Link>
                </li>
                <li className="nav-item active">
                <Link className="nav-link" to={'genres'}>Genres
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={'login'}>Login</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={'register'}>SignUp</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    <Books/>
    </div>
    

  )
}
export default HomePage