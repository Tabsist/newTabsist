/*global chrome*/
import { useState,useEffect } from 'react';
import { ShadowRoot } from './ShadowRoot';


import './App.css';
import Notes from './Notes';


function App() {

  return (
    <ShadowRoot>
      <Notes/>
    </ShadowRoot>
  );
}

export default App;

