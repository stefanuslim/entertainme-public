import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { gql, useMutation, useQuery } from '@apollo/client';
import { getEntertainMe } from './Home'
import { getMovieById } from './DetailMovie'
import { getSeriesById } from './DetailSeries'

const UPDATE_MOVIE = gql `
  mutation updateMovie($updatedMovie: MovieInput, $movieId: ID){
    updateMovie(_id:$movieId, movie:$updatedMovie){
      _id
      title
      overview
    }
  }
`

const UPDATE_SERIE = gql `
mutation updateSerie($updatedSerie: SerieInput, $serieId: ID){
  updateSerie(_id:$serieId, serie:$updatedSerie){
    _id
    title
    overview
  }
}
`




const FormEdit = () => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [posterURL, setPosterURL] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [tags, setTags] = useState('')


  const history = useHistory()
  const { id } = useParams()
  const location = history.location.pathname.split("/")[1]

  const { error, loading, data } = useQuery(location === 'movie' ? getMovieById: getSeriesById,
  {variables: location === 'movie' ? {movieId: id} : {seriesId: id}})

  useEffect(() => {
    if(data){
      let dataToSet = data.movie == null ? data.serie : data.movie
      setTitle(dataToSet.title)
      setOverview(dataToSet.overview)
      setPosterURL(dataToSet.poster_path)
      setPopularity(dataToSet.popularity)
      setTags(dataToSet.tags.join(","))
    }
  },[data])

  const [updateMovie, {}] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [
      {
        query: getEntertainMe,
      },
    ],
  })

  const [updateSerie, {}] = useMutation(UPDATE_SERIE, {
    refetchQueries: [
      {
        query: getEntertainMe,
      },
    ],
  })

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeOverview = (e) => {
    setOverview(e.target.value)
  }

  const onChangeURL = (e) => {
    setPosterURL(e.target.value)
  }

  const onChangePopularity = (e) => {
    setPopularity(e.target.value)
  }

  const onChangeTags = (e) => {
    setTags(e.target.value)
  }

  const onSubmitEdit = (id) => {
    const newUpdated = { title, overview, poster_path: posterURL, popularity: +popularity, tags }
    if(location === 'movie'){
      updateMovie({variables: {updatedMovie:newUpdated, movieId:id}})
    }
    else{
      updateSerie({variables: {updatedSerie:newUpdated, serieId:id}})
    }
    history.push("/")
  }

  const onCancelEdit = () => {
    history.push("/")
  }


  if (loading) return (<p>Loading</p>)
  if (error) return (<p>Error</p>)
  return (
    <>
    <Navbar />
    <h1 style={{color:'white'}}>{
    location === 'movie' ? `Add Movie` : `Add Series`}</h1>
    <div className="container col-5" style={{textAlign:'left'}}>
  <div className="form-group">
    <label style={{color:'white'}}>Title</label>
    <input type="text" className="form-control" placeholder="Movie Title" onChange={(e) => onChangeTitle(e)} defaultValue={data.movie == null ? data.serie.title : data.movie.title}/>
  </div>
  <div className="form-group">
    <label style={{color:'white'}}>Overview</label>
    <textarea className="form-control" rows="3" placeholder="Movie Overview" onChange={(e) => onChangeOverview(e)} defaultValue={data.movie == null ? data.serie.overview : data.movie.overview}></textarea>
  </div>
  <div className="form-group">
    <label style={{color:'white'}}>Poster_URL</label>
    <input type="text" className="form-control" placeholder="Movie Poster URL" onChange={(e) => onChangeURL(e)} defaultValue={data.movie == null ? data.serie.poster_path : data.movie.poster_path}/>
  </div>
  <div className="form-group">
    <label style={{color:'white'}}>Popularity</label>
    <input type="number" className="form-control" placeholder="Movie Popularity" onChange={(e) => onChangePopularity(e)} defaultValue={data.movie == null ? data.serie.popularity: data.movie.popularity}/>
  </div>
  <div className="form-group">
    <label style={{color:'white'}}>Tags</label>
    <input type="text" className="form-control" placeholder="Movie Tags" onChange={(e) => onChangeTags(e)} defaultValue={data.movie == null ? data.serie.tags : data.movie.tags}/>
  </div>
  <button type="submit" className="btn btn-primary mr-2" onClick={() => onSubmitEdit(id)}>Edit</button>
  <button type="click" className="btn btn-secondary" onClick={() => onCancelEdit()}>Cancel</button>
    </div>
    <Footer/>
    </>
  )
}

export default FormEdit
