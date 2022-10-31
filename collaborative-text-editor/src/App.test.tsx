import React from 'react'
import * as ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import App from "./App";

describe("testing the App component ", () =>{
  let container: HTMLDivElement
  beforeEach(() =>{
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<App/>, container);
  });
  afterEach(() =>{
    document.body.removeChild(container);
    container.remove();
  });

  describe('App', function () {
    it('should display a heading', function () {
        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<App/>, container);
        })
    });
 });

});