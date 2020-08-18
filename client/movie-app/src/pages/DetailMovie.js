import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

export const getMovieById = gql `
  query Movie($movieId: ID) {
    movie(_id: $movieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const DetailMovie = () => {
  const { id } = useParams()
  const { error, data, loading } = useQuery(getMovieById, {variables: {movieId: id}})
  if (loading) return (<Loading />)
  if (error) return (<p>Error</p>)
  return (
    <>
    <Navbar />
    <div class="container" style={{color:'white'}}>
    <div class="d-flex">
    <div class="p-4">
    <img src={ data.movie.poster_path } alt="" style={{width:350, height:500}}/>
    </div>
    <div class="p-2" style={{textAlign:'left'}}>
    <h1>Movie Title: { data.movie.title }</h1>
    <p>Movie Overview: { data.movie.overview } </p>
    <h4>Movie Popularity : { data.movie.popularity } </h4>
    <p>Movie Tags : { data.movie.tags.join(", ") } </p>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default DetailMovie
