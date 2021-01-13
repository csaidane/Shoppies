import React, {useState} from "react";
import Button from '@material-ui/core/Button';

export default function Album(props) {


  const [button, setButton] = useState(!props.nominations.filter((element) => {return element["Title"] === props.Title}).length>0);


  function nominate(){
    let tempArray = props.nominations
    let newNomination = {Title: props.Title, Year: props.Year, Poster:props.Poster, imdbID:props.imdbID}
    tempArray.push(newNomination)
    props.setNominations(tempArray);
    setButton(false)
  }

  function removeNominate(){
    let tempArray= props.nominations
    let newNominations = tempArray.filter((element) => {return element["Title"] !== props.Title})
    props.setNominations(newNominations)
    setButton(true)
  }


  return (
    <article className="movie">
      <img className="movie__thumbnail" src={props.Poster} alt="Movie" />
      <div className="movie__info">
        <div className="movie__interaction">
        <div className="movie__title">{props.Title}</div>
        <div className="movie__year">{props.Year}</div>
        </div>
      {button && <Button onClick={nominate} className="nominate-button" variant="contained" color="primary">nominate</Button>}
      {!button && <Button onClick={removeNominate} className="nominate-button" variant="contained" color="secondary">Remove</Button>}
      </div>
    </article>
  );
}
