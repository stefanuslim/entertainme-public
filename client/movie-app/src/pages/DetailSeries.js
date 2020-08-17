import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const getSeriesById = gql `
  query Serie($seriesId: ID) {
    serie(_id: $seriesId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const DetailSeries = () => {
  const { id } = useParams()
  const { error, data, loading } = useQuery(getSeriesById, {variables: {seriesId: id}})
  if (loading) return (<p>Loading</p>)
  if (error) return (<p>Error</p>)
  return (
    <>
    <Navbar />
    <div class="container" style={{color:'white'}}>
    <div class="d-flex">
    <div class="p-4">
    <img src={ data.serie.poster_path } alt="" style={{width:350, height:500}}/>
    </div>
    <div class="p-2" style={{textAlign:'left'}}>
    <h1>Series Title: { data.serie.title }</h1>
    <p>Series Overview: { data.serie.overview } </p>
    <h4>Series Popularity : { data.serie.popularity } </h4>
    <p>Series Tags : { data.serie.tags.join(", ") } </p>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default DetailSeries
