export const START_ELEMENTS = 'START_MOVIE';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const SEARCH_ELEMENTS = 'SEARCH_ELEMENTS';
export const LOADING_ELEMENTS = 'LOADING_ELEMENTS';
export const NOW_PLAYING_MOVIE = 'NOW_PLAYING_MOVIE';
export const ON_AIR_TV = 'ON_AIR_TV';

const clearResultsSearch = state => {
  return { ...state, isLoading: false, searchResults: undefined, page: undefined, totalPages: undefined }
}

const loadingElements = state => {
  return { ...state, isLoading: true }
}

const searchElements = (results, page, totalPages, state) => {
  return { ...state, isLoading: false, searchResults: results, page, totalPages }
}

const getStartElements = (movie, genres, state) => {
  return { ...state, isLoading: false, startMovie: movie, genresMovie: genres }
}

const getNowPlayingMovie = (movie, state) => {
  return { ...state, isLoading: false, nowPlayingMovie: movie }
}

const getOnAirTv = (tv, state) => {
  return { ...state, isLoading: false, onAirTv: tv }
}


export const movieReducer = (state, action) => {
  switch(action.type){
    case START_ELEMENTS:
      return getStartElements(action.movie, action.genres, state);
    case CLEAR_RESULTS:
      return clearResultsSearch(state);
    case LOADING_ELEMENTS:
      return loadingElements(state);
    case SEARCH_ELEMENTS:
      return searchElements(action.results, action.page, action.totalPages, state);
    case NOW_PLAYING_MOVIE:
      return getNowPlayingMovie(action.movie, state);
    case ON_AIR_TV:
      return getOnAirTv(action.tv, state);
    default:
      return state;
  }
}

