import React from "react";
import Movie from "./Movie";

export default function Results(props) {
  const {results} = props;

  return results.Search
    .map(movie => {
      return <Movie key={movie.imdbID} {...movie} nominations={props.nominations} setNominations={props.setNominations}/>;
    });
}
