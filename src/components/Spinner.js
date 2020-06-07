import React from "react";

import "../sass/spinner.scss";

function Spinner() {
  return (
    <section className="spinner_container">
      <section className="spinner_wrapper">
        <span className="spinner_dot"></span>
        <span className="spinner_dot"></span>
        <span className="spinner_dot"></span>
      </section>
    </section>
  );
}

export default Spinner;
