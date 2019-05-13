import React from 'react';
import PropTypes from 'prop-types';

import CreditsButtons from './CreditsButtons';
import CreditsElements from './CreditsElements';

function PersonCredits({ data, gender, creditsTitle }){

  let [dataName, setDataName] = React.useState('cast');
  let [dataCredits, setDataCredits] = React.useState([]);
  let [sortName, setSortName] = React.useState('popularity');
  let [orderDesc, setOrderDesc] = React.useState(true);

  React.useEffect(() => {
    if(data.cast && data.crew){
      const name = data.cast.length >= data.crew.length ? 'cast' : 'crew';
      setDataName(name);
      let newData = [...data[name]];
      newData.sort((a,b) => b.popularity - a.popularity);
      setDataCredits(newData);
    }
  }, []);

  const sort = (name, desc) => {
    let newData = [...dataCredits];
    if(name === 'popularity'){
      desc ? newData.sort((a,b) => b.popularity - a.popularity) : newData.sort((a,b) => a.popularity - b.popularity);
    }else{
      desc ? newData.sort((a,b) => new Date(b[name]).getTime() - new Date(a[name]).getTime()) : newData.sort((a,b) => new Date(a[name]).getTime() - new Date(b[name]).getTime())
    }
    setSortName(name);
    setOrderDesc(desc);
    setDataCredits(newData);
  }

  const toggleData = name => {
    if(dataName === name) return;
    setDataName(name);
    let newData = [...data[name]];
    newData.sort((a,b) => b.popularity - a.popularity);
    setDataCredits(newData);
    setSortName('popularity');
    setOrderDesc(true);
  }

  const type = creditsTitle === 'Filmy' ? 'movie' : 'tv';

  if(dataCredits.length === 0) return null;
  
  return (
    <React.Fragment>
      <h2 className="person_title">{creditsTitle}</h2>
      <CreditsButtons gender={gender} data={data} dataName={dataName} type={type} sortName={sortName} orderDesc={orderDesc} sort={sort} toggleData={toggleData} />
      <CreditsElements data={dataCredits} type={type} />
    </React.Fragment>
  );
}

PersonCredits.propTypes = {
  gender: PropTypes.number,
  creditsTitle: PropTypes.string.isRequired,
  data: PropTypes.object
}

export default PersonCredits;