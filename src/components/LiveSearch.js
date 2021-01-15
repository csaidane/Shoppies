import React, { Fragment, useState, useEffect, useRef } from "react";

import axios from "axios";

import SearchBar from "./SearchBar";
import Error from "./Error";
import Results from "./Results";
import NominationDisplay from "./NominationDisplay";
import Banner from "./Banner";


export default function LiveSearch(props) {
    const [search, setSearch] = useState({
      term: "",
      results: {Response: "False", totalResults:"0", Search: []},
      loading: false
    });

    const [nominations, setNominations] = useState([]);
  
    const [error, setError] = useState(false);
  
    const prev = useRef("");

    function showError() {
        setSearch({
          term: "",
          results: [],
          loading: false
        });
    
        setError(true);
      }

  
    useEffect(() => {
      if (prev.current === "" && search.term === "") return;
  
      setSearch(prev => ({
        ...prev,
        loading: true
      }));
  
      prev.current = search.term;
  
      axios
        .get(
          `http://www.omdbapi.com/?s=${search.term}&apikey=714fbc7e`
        )
        .then(response => {
          if(response.data.Response === "True"){
            setSearch(search => ({
              ...search,
              results: response.data,
              loading: false
            }));
          } else{
            setSearch(search => ({
              ...search,
              results: {Response: "False", totalResults:"0", Search: []},
              loading: false
            }));
          }  
        })
        .catch(error => {
            console.log(error)
            showError();
          });
    }, [search.term]);
  
    return (
      <Fragment>
        <header className="logo">
        <img src="./images/movie (2).png" alt="Logo" />
      </header>
        <main>
          <h1 className="intro">Shoppies Search</h1>
          <SearchBar
            loading={search.loading}
            onSearch={term => setSearch({ ...search, term })}
          />
          {nominations.length===5 && <Banner></Banner>}
          <NominationDisplay results={nominations} nominations={nominations} setNominations={setNominations}></NominationDisplay>
          <Error show={error} onClose={event => setError(false)}>
          The API has returned an error.
        </Error>
        <Results results={search.results} nominations={nominations} setNominations={setNominations} />
        </main>
      </Fragment>
    );
  }
  