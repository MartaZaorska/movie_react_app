import React from 'react';
import { API_KEY } from './keys';

const Context = React.createContext();

export default Context;

export const Consumer = Context.Consumer;

export function Provider(props){
  
  const [state, setState] = React.useState({
    startMovie: undefined,
    genresMovie: undefined,
    resultSearch: undefined,
    isLoading: false,
    totalPages: undefined,
    page: undefined
  });


  const searchElements = (type, query, page = 1) => {
    setState({ ...state, isLoading: true });
    fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=pl-PL&query=${query}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setState({ ...state, resultSearch: data.results, totalPages: data.total_pages, page: data.page, isLoading: false });
      })
      .catch(err => console.log(err));
  }
  
  const getStartMovie = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pl-PL&region=PL`)
        .then(res => res.json())
        .then(data => {
          const startMovie = data.results.sort((a,b) => b.popularity - a.popularity)[0];
          resolve(startMovie);
        })
        .catch(err => reject(err));
    });
  }

  const getGenresMovie = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pl-PL`)
        .then(res => res.json())
        .then(data => {
          resolve(data.genres);
        })
        .catch(err => reject(err));
    });
  }

  React.useEffect(() => {
    if(!state.genresMovie || !state.startMovie){
      Promise.all([getGenresMovie(), getStartMovie()])
        .then(res => {
          setState({
            ...state,
            genresMovie: res[0],
            startMovie: res[1]
          });
        })
        .catch(err => console.log(err)); 
    }
  }, []);


  return (
    <Context.Provider value={{
      ...state,
      searchElements
    }}>
      {props.children}
    </Context.Provider>
  );
}