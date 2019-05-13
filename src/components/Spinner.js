import React from 'react';

import '../sass/spinner.scss';

function Spinner(){
  return (
    <section className="spinner_container">
      <section className="spinner_perspective">
        <section className="spinner_wrapper">
          <section className="top"></section>
          <section className="down"></section>
          <section className="left"></section>
          <section className="right"></section>
          <section className="front"></section>
          <section className="back"></section>
        </section>
      </section>
    </section>
  )
}

export default Spinner;