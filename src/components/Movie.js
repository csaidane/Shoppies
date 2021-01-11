import React from "react";


export default function Album(props) {
  return (
    <article className="movie">
      <img className="movie__thumbnail" src={props.Poster} alt="Movie" />
      <div className="movie__info">
        <div className="movie__title">{props.Title}</div>
        <div className="movie__year">{props.Year}</div>
      </div>
    </article>
  );
}
