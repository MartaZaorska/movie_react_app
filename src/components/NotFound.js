import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../sass/notfound.scss';

function NotFound({type}){
  return (
    <section className="not_found_container">
      <section className="not_found_content">
        <h2 className="not_found_title">404</h2>
        <p className="not_found_text">{type === 'movie' ? 'Taki film nie istnieje...' : (type === 'person' ? 'Taka osoba nie istnieje...' : 'Taki serial nie istnieje...')}</p>
        <Link to="/search/multi" className="not_found_link">
          Przejdź do wyszukiwarki
        </Link>
      </section>
    </section>
  );
}

NotFound.propTypes = {
  type: PropTypes.string.isRequired
};

export default NotFound;