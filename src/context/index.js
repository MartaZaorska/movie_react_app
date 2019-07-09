import React from 'react';
import { API_KEY } from '../keys';
import Store from '../store';
import {
  movieReducer,
  START_ELEMENTS,
  CLEAR_RESULTS,
  LOADING_ELEMENTS,
  SEARCH_ELEMENTS,
  NOW_PLAYING_MOVIE,
  ON_AIR_TV,
  RANKING_MOVIE,
  RANKING_TV,
  RANKING_PERSON,
  SINGLE_ELEMENT,
  CLEAR_SINGLE_ELEMENT,
  NOT_FOUND_ERROR,
  SET_STORE_ELEMENTS
} from './reducers';

const Context = React.createContext();

export default Context;

export const Consumer = Context.Consumer;

export function Provider(props) {
  const initialState = {
    isLoading: false,
    notFoundError: false,
    searchResults: undefined,
    page: undefined,
    totalPages: undefined,
    startMovie: undefined,
    genresMovie: undefined,
    nowPlayingMovie: undefined,
    onAirTv: undefined,
    popularTv: undefined,
    popularMovie: undefined,
    popularPerson: undefined,
    topRatedTv: undefined,
    topRatedMovie: undefined,
    singleElement: undefined,
    favourite: undefined,
    wantSee: undefined
  };

  const [state, dispatch] = React.useReducer(movieReducer, initialState);

  const clearResultsSearch = () => {
    dispatch({ type: CLEAR_RESULTS });
  };

  const searchElements = (type, query, page = 1) => {
    dispatch({ type: LOADING_ELEMENTS });
    fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=pl-PL&query=${query}&page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: SEARCH_ELEMENTS,
          page,
          totalPages: data.total_pages,
          results: data.results
        });
      })
      .catch(err => console.log(err));
  };

  const getStartMovie = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pl-PL`
      )
        .then(res => res.json())
        .then(data => {
          const startMovie = data.results.sort(
            (a, b) => b.popularity - a.popularity
          )[0];
          resolve(startMovie);
        })
        .catch(err => reject(err));
    });
  };

  const getGenresMovie = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pl-PL`
      )
        .then(res => res.json())
        .then(data => {
          resolve(data.genres);
        })
        .catch(err => reject(err));
    });
  };

  const getNowPlayingMovie = () => {
    if (!state.nowPlayingMovie) {
      dispatch({ type: LOADING_ELEMENTS });
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pl-PL`
      )
        .then(res => res.json())
        .then(data => {
          const movie = data.results.sort(
            (a, b) => b.popularity - a.popularity
          );
          dispatch({ type: NOW_PLAYING_MOVIE, movie });
        })
        .catch(err => console.log(err));
    }
  };

  const getOnAirTv = () => {
    if (!state.onAirTv) {
      dispatch({ type: LOADING_ELEMENTS });
      fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=pl-PL`
      )
        .then(res => res.json())
        .then(data => {
          const tv = data.results.sort((a, b) => b.popularity - a.popularity);
          dispatch({ type: ON_AIR_TV, tv });
        })
        .catch(err => console.log(err));
    }
  };

  const getRankingElements = (mediaType, type, page) => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.themoviedb.org/3/${mediaType}/${type}?api_key=${API_KEY}&language=pl-PL&page=${page}`
      )
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  };

  const getRankingMovie = () => {
    if (!state.topRatedMovie || !state.popularMovie) {
      dispatch({ type: LOADING_ELEMENTS });
      Promise.all([
        getRankingElements('movie', 'top_rated', 1),
        getRankingElements('movie', 'top_rated', 2),
        getRankingElements('movie', 'popular', 1),
        getRankingElements('movie', 'popular', 2)
      ])
        .then(data => {
          const topRated = [...data[0].results, ...data[1].results];
          const popular = [...data[2].results, ...data[3].results];
          dispatch({ type: RANKING_MOVIE, popular, topRated });
        })
        .catch(err => console.log(err));
    }
  };

  const getRankingTv = () => {
    if (!state.topRatedTv || !state.popularTv) {
      dispatch({ type: LOADING_ELEMENTS });
      Promise.all([
        getRankingElements('tv', 'top_rated', 1),
        getRankingElements('tv', 'top_rated', 2),
        getRankingElements('tv', 'popular', 1),
        getRankingElements('tv', 'popular', 2)
      ])
        .then(data => {
          const topRated = [...data[0].results, ...data[1].results];
          const popular = [...data[2].results, ...data[3].results];
          dispatch({ type: RANKING_TV, popular, topRated });
        })
        .catch(err => console.log(err));
    }
  };

  const getRankingPerson = () => {
    if (!state.popularPerson) {
      dispatch({ type: LOADING_ELEMENTS });
      Promise.all([
        getRankingElements('person', 'popular', 1),
        getRankingElements('person', 'popular', 2)
      ])
        .then(data => {
          const popular = [...data[0].results, ...data[1].results];
          dispatch({ type: RANKING_PERSON, popular });
        })
        .catch(err => console.log(err));
    }
  };

  const getPartElement = (type, media_id, part = false) => {
    let url = `https://api.themoviedb.org/3/${type}`;
    if (!part) url += `/${media_id}?api_key=${API_KEY}&language=pl-PL`;
    if (part && part !== 'videos')
      url += `/${media_id}/${part}?api_key=${API_KEY}&language=pl-PL&include_image_language=en,null`;
    if (part && part === 'videos')
      url += `/${media_id}/${part}?api_key=${API_KEY}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => console.log(err));
    });
  };

  const getSingleElement = (type, media_id) => {
    dispatch({ type: LOADING_ELEMENTS });

    const promises = [
      getPartElement(type, media_id),
      getPartElement(type, media_id, 'external_ids'),
      getPartElement(type, media_id, 'images')
    ];

    if (type === 'movie' || type === 'tv')
      promises.push(
        getPartElement(type, media_id, 'credits'),
        getPartElement(type, media_id, 'recommendations')
      );

    if (type === 'movie')
      promises.push(getPartElement(type, media_id, 'videos'));

    if (type === 'person')
      promises.push(
        getPartElement(type, media_id, 'tagged_images'),
        getPartElement(type, media_id, 'movie_credits'),
        getPartElement(type, media_id, 'tv_credits')
      );

    Promise.all(promises)
      .then(data => {
        let element;
        if (type === 'movie')
          element = {
            base: data[0],
            external_ids: data[1],
            images: data[2],
            credits: data[3],
            recommendations: data[4],
            videos: data[5]
          };

        if (type === 'tv')
          element = {
            base: data[0],
            external_ids: data[1],
            images: data[2],
            credits: data[3],
            recommendations: data[4]
          };

        if (type === 'person')
          element = {
            base: data[0],
            external_ids: data[1],
            images: data[2],
            tagged_images: data[3],
            movie_credits: data[4],
            tv_credits: data[5]
          };

        if (data.some(item => item.status_code && item.status_code === 34)) {
          dispatch({ type: NOT_FOUND_ERROR });
        } else {
          dispatch({ type: SINGLE_ELEMENT, element });
        }
      })
      .catch(err => console.log(err));
  };

  const clearSingleElement = () => {
    dispatch({ type: CLEAR_SINGLE_ELEMENT });
  };

  const getElementsFromStore = () => {
    const favourite = Store.getElements('favourite');
    const wantSee = Store.getElements('wantsee');
    dispatch({ type: SET_STORE_ELEMENTS, favourite, wantSee });
  };

  React.useEffect(() => {
    if (!state.genresMovie || !state.startMovie) {
      dispatch({ type: LOADING_ELEMENTS });
      Promise.all([getGenresMovie(), getStartMovie()])
        .then(res => {
          dispatch({ type: START_ELEMENTS, movie: res[1], genres: res[0] });
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        ...state,
        searchElements,
        clearResultsSearch,
        getNowPlayingMovie,
        getOnAirTv,
        getRankingMovie,
        getRankingTv,
        getRankingPerson,
        getSingleElement,
        clearSingleElement,
        getElementsFromStore
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
