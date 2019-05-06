import React from 'react';
import { API_KEY } from '../keys';
import { movieReducer, START_ELEMENTS, CLEAR_RESULTS, LOADING_ELEMENTS, SEARCH_ELEMENTS, NOW_PLAYING_MOVIE, ON_AIR_TV } from './reducers';

const Context = React.createContext();

export default Context;

export const Consumer = Context.Consumer;

export function Provider(props){
  
  const initialState = {
    isLoading: false, 
    searchResults: undefined, 
    page: undefined, 
    totalPages: undefined,
    startMovie: undefined,
    genresMovie: undefined,
    nowPlayingMovie: undefined,
    onAirTv: undefined
  }

  const [ state, dispatch ] = React.useReducer(movieReducer, initialState); 

  const clearResultsSearch  = () => {
    dispatch({ type: CLEAR_RESULTS });
  }

  const searchElements = (type, query, page = 1) => {
    dispatch({ type: LOADING_ELEMENTS });
    fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=pl-PL&query=${query}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: SEARCH_ELEMENTS, page, totalPages: data.total_pages, results: data.results });
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

  const getNowPlayingMovie = () => {
    if(!state.nowPlayingMovie){
      dispatch({ type: LOADING_ELEMENTS });
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pl-PL&region=PL`)
        .then(res => res.json())
        .then(data => {
          const movie = data.results.sort((a,b) => b.popularity - a.popularity);
          dispatch({ type: NOW_PLAYING_MOVIE, movie });
        })
        .catch(err => console.log(err));
    }
  }

  const getOnAirTv = () => {
    if(!state.onAirTv){
      dispatch({ type: LOADING_ELEMENTS });
      fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=pl-PL&region=PL`)
        .then(res => res.json())
        .then(data => {
          const tv = data.results.sort((a,b) => b.popularity - a.popularity);
          dispatch({ type: ON_AIR_TV, tv });
        })
        .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    if(!state.genresMovie || !state.startMovie){
      dispatch({ type: LOADING_ELEMENTS });
      Promise.all([getGenresMovie(), getStartMovie()])
        .then(res => {
          dispatch({ type: START_ELEMENTS, movie: res[1], genres: res[0] });
        })
        .catch(err => console.log(err)); 
    }
  }, []);


  return (
    <Context.Provider value={{
      ...state,
      searchElements,
      clearResultsSearch,
      getNowPlayingMovie,
      getOnAirTv
    }}>
      {props.children}
    </Context.Provider>
  );
}