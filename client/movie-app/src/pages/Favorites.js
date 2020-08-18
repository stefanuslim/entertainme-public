import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useQuery, gql } from '@apollo/client'
import FavoriteCard from '../components/FavoriteCard'
import Loading from '../components/Loading'

export const GET_FAVORITES = gql `
  query {
    favorites @client
  }
`


const Favorites = () => {
  const { error, loading, data } = useQuery(GET_FAVORITES)
  if(loading) return (<Loading />)
  return (
    <>
    <Navbar />
    <div className="container fluid mt-3">
    <div>
    <h1 style={{textAlign:'center',color:'white'}}>Favorites</h1>
    </div>
    <div className="row flex-row flex-nowrap mt-4 pb-4" style={{overflowX:'auto'}}>
    {
      data.favorites.map((favorite,idx) =>
        (
          <FavoriteCard key={idx} movie={favorite}/>
        )
      )
    }
    </div>
    </div>
    </>
  )
}

export default Favorites
