import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TumbnailCanvas from "./TumbnailCanvas";
import types from "./Values/types";
import actions from "./Values/actions";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
