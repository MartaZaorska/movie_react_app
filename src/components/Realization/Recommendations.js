import React from 'react';
import { Link } from 'react-router-dom';

function Recommendations(props){

  let [visibleData, setVisibleData] = React.useState(4);

  const data = props.recommendations && props.recommendations.results ? (props.recommendations.results.length > 12 ? [...props.recommendations.results.slice(0, 12)] : [...props.recommendations.results]) : [];
  const count = 4;
  const totalData = data.length;

  const showMore = () => {
    let visible = Math.min(visibleData + count, totalData);
    if(visible >= totalData) document.querySelector(`.showmore_recommendations_button`).style.display = 'none';
    setVisibleData(visible);
  }

  return (
    <section className="realization_recommendations">
      <header><h2 className="realization_title">Polecane</h2></header>
      {data.slice(0, visibleData).map(item => {
        const { backdrop_path, id, name, vote_average, first_air_date, release_date, title } = item;
        const type = title ? 'movie' : 'tv';
        const itemTitle = title ? title : name;
        return (
          <section className="recommendations_item" key={`${id}-recommendations`}>
            <section className="recommendations_image">
              { backdrop_path ? <img src={`https://image.tmdb.org/t/p/w300${backdrop_path}`} alt="poster" /> : <i className="fas fa-film"></i> }
            </section>
            <section className="recommendations_content">
              <Link to={`/realization/${type}/${id}`}>{itemTitle.length > 28 ? `${itemTitle.substring(0,25)}...` : itemTitle }</Link><br />
              <p className="recommendations_vote">Ocena: <span>{vote_average === 0 ? 'brak oceny' : vote_average}</span></p>
            </section>
            <div style={{ clear: 'both' }}></div>
          </section>
        );
      })}
      {visibleData === totalData ? null : (
        <button onClick={showMore} className="realization_button showmore_recommendations_button">Pokaż więcej</button>
      )}
    </section>
  );
}

export default Recommendations;