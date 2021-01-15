import React from "react";
import Movie from "./Movie";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function Results(props) {
  const {results} = props;

  if (results.length === 0) {
    return (
    <Card>
    <CardContent>
    <Typography variant="body2" component="p">
    Your nominations are currently empty. Add movies to your nominations using the nominate button after searching !
    </Typography>
    </CardContent>
    </Card>
  )};

  return results
    .map(movie => {
      return <Movie key={movie.imdbID} {...movie} nominations={props.nominations} setNominations={props.setNominations}/>;
    });
}
