import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Loading from '../components/Loading'

export const getSeries = gql `
  query {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


const Series = () => {
  const { error, loading, data } = useQuery(getSeries)
  if (loading) return (<Loading />)
  if (error) return (<p>Error</p>)
  return (
    <>
    <Navbar/>
    <div class="container">
    <h1 style={{color:'white'}}>TV Series Page</h1>
    <div class="row">
    {
      data.series.map((serie,idx) => {
        return (
          <Card series={serie} key={idx}/>
        )
      })
    }
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Series
