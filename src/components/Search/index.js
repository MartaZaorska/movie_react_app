import React from 'react';
import SearchMenu from './SearchMenu';
import ResultItem from './ResultItem';

import Context from '../../context';
import classNames from 'classnames';

import '../../sass/search.scss';

function Search(props){

  const context = React.useContext(Context);

  let [ searchValue, setSearchValue ] = React.useState('');

  let [ searchType, setSearchType ] = React.useState('');

  let [ placeholder, setPlaceholder ] = React.useState('');


  const changeType = (e, type, cb) => {
    e.preventDefault();
    setSearchType(type);
    if(searchValue !== ''){
      cb(type, searchValue);
    }
  }

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    if(searchValue === ''){
      const info = document.querySelector('.info');
      info.textContent = 'Pole wyszukiwania nie może być puste.';
      info.classList.add('show_info');
      setTimeout(() => info.classList.remove('show_info'), 3000);
    }else{
      cb(searchType, searchValue);
    }
  }

  const prevPage = (current, cb) => {
    const newPage = current - 1;
    if(newPage > 0){
      cb(searchType, searchValue, newPage);
      window.scroll({ left: 0, top: 0, behavior: 'smooth' });
    } 
  }

  const nextPage = (current, total, cb) => {
    const newPage = current + 1;
    if(newPage <= total){
      cb(searchType, searchValue, newPage);
      window.scroll({ left: 0, top: 0, behavior: 'smooth' });
    }
  }

  
  React.useEffect(() => {
    if(context.clearResultsSearch) context.clearResultsSearch();
    setSearchType(props.match.params.type_search);
    document.querySelector('.search_container').classList.add('enter');
    window.addEventListener('keypress', e => {
      if(e.keyCode === 13) e.preventDefault();
    });
  }, [props.match.params.type_search]);


  React.useEffect(() => {
    const label = searchType === 'multi' ? 'Szukaj filmów, seriali, osób...' : (searchType === 'movie' ? 'Szukaj filmów...' : (searchType === 'tv' ? 'Szukaj seriali....' : 'Szukaj osób...'));
    setPlaceholder(label);
  }, [searchType]);

  if(!context.searchElements){
    return <div>Loading...</div>
  }

  const { searchElements, isLoading, searchResults, totalPages, page } = context;

  return (
    <article className="search_container">
      <SearchMenu />
      <article className="search_wrapper">
        <p className="info alert"></p>
        <form className="search_form" onSubmit={e => handleSubmit(e, searchElements)}>
          <input type="text" autoFocus={true} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder={`${placeholder}`} />
          <button onClick={e => changeType(e, 'multi', searchElements)} className={classNames({
            'search_type': true,
            'search_type_active': searchType === 'multi'
          })}>Wszystko</button>
          <button onClick={e => changeType(e, 'movie', searchElements)} className={classNames({
            'search_type': true,
            'search_type_active': searchType === 'movie'
          })}>Tylko filmy</button>
          <button onClick={e => changeType(e, 'tv', searchElements)} className={classNames({
            'search_type': true,
            'search_type_active': searchType === 'tv'
          })}>Tylko seriale</button>
          <button onClick={e => changeType(e, 'person', searchElements)} className={classNames({
            'search_type': true,
            'search_type_active': searchType === 'person'
          })}>Tylko ludzie</button>
          <br />
          <button type="submit" className="search_button">Szukaj <i className="fas fa-search"></i></button>
        </form>
        {isLoading === false && !searchResults ? null : (isLoading === true ? (
          <p>Loading...</p>
        ) : (searchResults.length === 0 ? (
          <p>Brak wyników wyszukiwania...</p>
        ) : (
          <React.Fragment>
            {searchResults.map(item => (
              <ResultItem item={item} key={item.id} />
            ))}
          </React.Fragment>
        )))}
        {totalPages > 1 ? (
          <section className="pages_results">
            {page > 1 ? (<i className="prev fas fa-angle-left" onClick={() => prevPage(page, searchElements)}></i>) : (<i className="prev disabled fas fa-angle-left"></i>)}
            <span className="current_page">{page}</span>
            {page < totalPages ? (<i className="next fas fa-angle-right" onClick={() => nextPage(page, totalPages, searchElements)}></i>) : (<i className="next disabled fas fa-angle-right"></i>)}
          </section>
        ) : null }
      </article>
    </article>
  );
}

export default Search;