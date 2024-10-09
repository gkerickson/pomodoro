import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles.scss';

const rootNode = document.getElementById('root');
const root     = ReactDOM.createRoot(rootNode);

root.render(<App></App>);
