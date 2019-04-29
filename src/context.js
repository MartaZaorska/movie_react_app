import React from 'react';

const Context = React.createContext();

export default Context;

export const Consumer = Context.Consumer;

export function Provider(props){
  
  const [state, setState] = React.useState({
    startMovie: undefined,
    genresMovie: undefined,
  });

  

  return (
    <Context.Provider value={{
      ...state
    }}>
      {props.children}
    </Context.Provider>
  );
}