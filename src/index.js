import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context';

import './sass/index.scss';

ReactDOM.render(<BrowserRouter><Provider><App /></Provider></BrowserRouter>, document.getElementById('root'));
