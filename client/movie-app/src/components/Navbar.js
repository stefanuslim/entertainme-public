import React from 'react'
import { useHistory } from 'react-router-dom'



const Navbar = () => {
  const history = useHistory()

  const goToMovies = (e) => {
    e.preventDefault()
    history.push("/movies")
  }

  const goToSeries = (e) => {
    e.preventDefault()
    history.push("/series")
  }

  const goToHome = (e) => {
    e.preventDefault()
    history.push("/")
  }

  const goToFavorites = (e) => {
    e.preventDefault()
    history.push("/favorites")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
  <a className="navbar-brand" style={{color:'white'}}>Cinema-22</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="" onClick={(e) => goToHome(e)} style={{color:'white'}}>Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="" onClick={(e) => goToMovies(e)} style={{color:'white'}}>Movies</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="" onClick={(e) => goToSeries(e)} style={{color:'white'}}>TV Series</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="" onClick={(e) => goToFavorites(e)} style={{color:'white'}}>Favorites</a>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default Navbar
