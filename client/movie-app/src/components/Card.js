import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import { getEntertainMe } from '../pages/Home'
import { GET_FAVORITES } from '../pages/Favorites'
import { favoriteItems } from '../config'

const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const DELETE_SERIE = gql`
  mutation deleteSerie($id: ID) {
    deleteSerie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


const Card = (props) => {
  const {error, loading, data} = useQuery(GET_FAVORITES)
  const { _id, title, poster_path, popularity, tags } = props.movie == null ? props.series : props.movie
  const [deleteMovie, { }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      {
        query: getEntertainMe
      },
    ],
  })
  const [deleteSerie, {  }] = useMutation(DELETE_SERIE, {
    refetchQueries: [
      {
        query: getEntertainMe
      },
    ],
  })

  const history = useHistory()

  const getDetail = (id) => {
    if(props.movie == null) {
      history.push(`/series/${id}`)
    }
    else{
      history.push(`/movie/${id}`)
    }
  }

  const onDelete = (id) => {
    if(props.movie == null) {
      deleteSerie({ variables: { id: id } });
    }
    else{
      deleteMovie({ variables: {id: id }});
    }
  }

  const onEdit = (id) => {
    if(props.movie == null){
      history.push(`series/edit/${id}`)
    }
    else{
      history.push(`movie/edit/${id}`)
    }
  }

  const onAddFavorite = () => {
      let currentFavorites = data.favorites
      favoriteItems(currentFavorites.concat(props.movie == null ? props.series : props.movie))
  }

  return (
    <div className="col-3">
    <div className="card" style={{width: '15rem', backgroundColor:'#66ccff'}}>
    <img className="rounded mx-auto d-block" src={ poster_path } alt="" style={{width: 230, height:330}} onClick={() => getDetail(_id)}/>
    <div className="card-body">
      <h5 className="card-title">{ title }</h5>
      <p className="card-text">Genre: { tags.join(", ") }</p>
      <p className="card-text">Popularity: { popularity }</p>
      <a className="btn btn-success mr-3" style={{color:'white'}} onClick={() => onEdit(_id)}>Update</a>
      <a className="btn btn-danger mr-3" style={{color:'white'}} onClick={() => onDelete(_id)}>Delete</a>
      <a className="btn btn-dark mt-2" style={{color:'white'}} onClick={() => onAddFavorite()}>Add Favorite</a>
      </div>
    </div>
    </div>
  )
}

export default Card
