import React from 'react'


const FavoriteCard = (props) => {
  const { title, poster_path, tags, popularity } = props.movie
  return (
    <div className="col-3">
    <div className="card" style={{width: '15rem', backgroundColor:'#66ccff'}}>
    <img className="rounded mx-auto d-block" src={ poster_path } alt="" style={{width: 230, height:330}}/>
    <div className="card-body">
      <h5 className="card-title">{ title }</h5>
      <p className="card-text">Genre: { tags.join(", ") }</p>
      <p className="card-text">Popularity: { popularity }</p>
      </div>
    </div>
    </div>
  )
}

export default FavoriteCard
