import React from 'react'
import Card from '../components/Card'
import { useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

export const getEntertainMe = gql`
  query getEntertainMe {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    },
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

const Home = () => {
  const history = useHistory()
  const { loading, error, data } = useQuery(getEntertainMe);
  if (loading) return (<Loading />)
  if (error) return (<p>Error</p>)

  const toAddMoviePage = () => {
    history.push("/movie/create")
  }

  const toAddSeriePage = () => {
    history.push("/series/create")
  }

  return (
    <div>
    <Navbar />
    <div className="container fluid mt-3">
    <div className="d-flex justify-content-between">
    <div>
    <h3 style={{textAlign:'left',color:'white'}}>Movies</h3>
    </div>
    <div>
    <a className="btn btn-primary" style={{color:'white'}} onClick={() => toAddMoviePage()}>Add Movie</a>
    </div>
    </div>
    <div className="row flex-row flex-nowrap mt-4 pb-4" style={{overflowX:'auto'}}>
    {data.movies.map((movie,idx) => {
      return (
        <Card movie={movie} key={idx} />
      )
    })}
    </div>
    </div>

    <div className="container fluid mt-3">
    <div className="d-flex justify-content-between">
    <div>
    <h3 style={{textAlign:'left',color:'white'}}>TV Series</h3>
    </div>
    <div>
    <a className="btn btn-primary" style={{color:'white'}} onClick={() => toAddSeriePage()}>Add Series</a>
    </div>
    </div>
    <div className="row flex-row flex-nowrap mt-4 pb-4" style={{overflowX:'auto'}}>
    {data.series.map((serie,idx) => {
      return (
        <Card series={serie} key={idx} />
      )
    })}
    </div>
    </div>
    <Footer/>
    </div>
  )
}


export default Home
