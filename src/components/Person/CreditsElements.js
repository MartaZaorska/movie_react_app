import React from 'react';
import PropTypes from 'prop-types';

import CreditsItem from './CreditsItem';


function CreditsElements({ data, type }){

  let [visibleData, setVisibleData] = React.useState(0);
  const count = 8;

  React.useEffect(() => {
    setVisibleData(Math.min(data.length, 8));
  }, []);

  const showMore = () => {
    let visible = Math.min(visibleData + count, data.length);
    if(visible >= data.length) document.querySelector(`.showmore_credits_${type}_button`).style.display = 'none';
    setVisibleData(visible);
  }

  if(!data || data.length === 0) return null;

  return (
    <React.Fragment>
      {data.slice(0,visibleData).map(item => (
        <CreditsItem key={`${item.id}-${item.credit_id}`} item={item} type={type} />
      ))}
      {data.length === visibleData ? null : (
        <button className={`person_button showmore_credits_${type}_button`} onClick={showMore}>Pokaż więcej</button>
      )}
    </React.Fragment>
  );
}

CreditsElements.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string.isRequired
};

export default React.memo(CreditsElements);