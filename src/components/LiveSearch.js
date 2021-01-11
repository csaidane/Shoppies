import React, { Fragment, useState, useEffect, useRef } from "react";

import axios from "axios";

import SearchBar from "./SearchBar";
import Error from "./Error";
import Results from "./Results";


export default function LiveSearch(props) {
    const [search, setSearch] = useState({
      term: "",
      results: [],
      loading: false
    });
  
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
          setSearch(search => ({
            ...search,
            results: response.data,
            loading: false
          }));
        })
        .catch(error => {
            console.log(error)
            showError();
          });
    }, [search.term]);
  
    return (
      <Fragment>
        <main>
          <SearchBar
            loading={search.loading}
            onSearch={term => setSearch({ ...search, term })}
          />
          <Error show={error} onClose={event => setError(false)}>
          The API has returned an error.
        </Error>
        <Results results={search.results} />
        </main>
      </Fragment>
    );
  }
  