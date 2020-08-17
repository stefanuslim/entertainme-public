import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export const getMovies = gql `
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


const Movie = () => {
  const { error, loading, data } = useQuery(getMovies)
  if (loading) return (<p>Loading</p>)
  if (error) return (<p>Error</p>)
  return (
    <>
    <Navbar/>
    <div class="container">
    <h1 style={{color:'white'}}>Movies Page</h1>
    <div class="row">
    {
      data.movies.map((movie,idx) => {
        return (
          <Card movie={movie} key={idx}/>
        )
      })
    }
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Movie
