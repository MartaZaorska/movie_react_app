import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function CreditsButtons({ gender, data, type, sortName, orderDesc, sort, dataName, toggleData }){

  const { cast = [], crew = []} = data;

  const moreCast = cast.length >= crew.length ? true : false;
  const sortDateName = type === 'movie' ? 'release_date' : 'first_air_date';

  const handleClickSort = name => {
    if(sortName !== name){
      sort(name, true);
    }else{
      sort(sortName, !orderDesc);
    }
  }

  if(cast.length === 0 && crew.length === 0) return null;

  return (
    <section className="credits_buttons">

      <span className="credits_job_button">
        {moreCast ? (
          <React.Fragment>
            <span onClick={() => toggleData('cast')} className={classNames({
              'left': true,
              'cast_job_button': true,
              'cast_job_button_active': dataName === 'cast'
            })}>{gender === 1 ? 'Aktorka' : 'Aktor'}</span>
            <span onClick={() => toggleData('crew')} className={classNames({
              'right': true,
              'crew_job_button': true,
              'crew_job_button_active': dataName === 'crew',
              'crew_job_button_disabled': crew.length === 0
            })}>Twórca</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span onClick={() => toggleData('crew')} className={classNames({
              'left': true,
              'crew_job_button': true,
              'crew_job_button_active': dataName === 'crew'
            })}>Twórca</span>
            <span onClick={() => toggleData('cast')} className={classNames({
              'right': true,
              'cast_job_button': true,
              'cast_job_button_active': dataName === 'cast',
              'cast_job_button_disabled': cast.length === 0
            })}>{gender === 1 ? 'Aktorka' : 'Aktor'}</span>
          </React.Fragment>
        )}
      </span>

      <span className="credits_sort_button">
        <span onClick={() => handleClickSort('popularity')} className={classNames({
          'left': true,
          'sort_popularity': true,
          'sort_popularity_active': sortName === 'popularity'
        })}>
          Popularność {orderDesc ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i>}
        </span>
        <span onClick={() => handleClickSort(sortDateName)} className={classNames({
          'right': true,
          'sort_date': true,
          'sort_date_active': sortName === sortDateName
        })}>
          Premiera {orderDesc ? <i className="fas fa-long-arrow-alt-down"></i> : <i className="fas fa-long-arrow-alt-up"></i>}
        </span>
      </span>

    </section>
  );
}

CreditsButtons.propTypes = {
  gender: PropTypes.number,
  data: PropTypes.object,
  type: PropTypes.string.isRequired,
  sortName: PropTypes.string.isRequired,
  orderDesc: PropTypes.bool.isRequired,
  sort: PropTypes.func.isRequired,
  toggleData: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired
};

export default CreditsButtons;