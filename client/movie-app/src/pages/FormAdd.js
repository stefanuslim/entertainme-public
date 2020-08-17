import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import { getEntertainMe } from './Home'

const ADD_MOVIE = gql `
  mutation addMovie($newMovie: MovieInput) {
    addMovie(movie: $newMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const ADD_SERIE = gql `
  mutation addSerie($newSerie: SerieInput) {
    addSerie(serie: $newSerie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`



const FormAdd = () => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [posterURL, setPosterURL] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [tags, setTags] = useState('')

  const [addMovie, { }] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      {
        query: getEntertainMe,
      },
    ],
  });

  const [addSerie, { }] = useMutation(ADD_SERIE, {
    refetchQueries: [
      {
        query: getEntertainMe,
      },
    ],
  });

  const history = useHistory()


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

  const onSubmitAdd = () => {
    const newAdded = { title, overview, poster_path: posterURL, popularity: +popularity, tags }
    if(history.location.pathname.split("/")[1] === 'movie'){
      addMovie({variables: { newMovie: newAdded}})
    }
    else {
      addSerie({variables: {newSerie: newAdded}})
    }
    history.push("/")
  }

  const onCancelAdd = () => {
    history.push("/")
  }

  return (
    <>
    <Navbar />
    <h1 style={{color:'white'}}>{
      history.location.pathname.split("/")[1] === 'movie' ? `Add Movie` : `Add Series`
    }</h1>
    <div className="container col-5" style={{textAlign:'left'}}>
  <div class="form-group">
    <label style={{color:'white'}}>Title</label>
    <input type="text" class="form-control" placeholder="Title" onChange={(e) => onChangeTitle(e)}/>
  </div>
  <div class="form-group">
    <label style={{color:'white'}}>Overview</label>
    <textarea class="form-control" rows="3" placeholder="Overview" onChange={(e) => onChangeOverview(e)}></textarea>
  </div>
  <div class="form-group">
    <label style={{color:'white'}}>Poster_URL</label>
    <input type="text" class="form-control" placeholder="Poster URL" onChange={(e) => onChangeURL(e)}/>
  </div>
  <div class="form-group">
    <label style={{color:'white'}}>Popularity</label>
    <input type="number" class="form-control" placeholder="Popularity" onChange={(e) => onChangePopularity(e)}/>
  </div>
  <div class="form-group">
    <label style={{color:'white'}}>Tags</label>
    <input type="text" class="form-control" placeholder="Tags" onChange={(e) => onChangeTags(e)}/>
  </div>
  <button type="submit" class="btn btn-primary mr-2" onClick={() => onSubmitAdd()}>Add</button>
  <button type="click" class="btn btn-secondary" onClick={() => onCancelAdd()}>Cancel</button>
    </div>
    <Footer/>
    </>
  )
}


export default FormAdd
