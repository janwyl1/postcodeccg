import React from 'react';
// import logo from './logo.svg';

import './normalize.css';
import './skeleton.css';
import './App.css';
import PostcodeToCcg from './PostcodeToCcg'
import Header from './Header'
import Footer from './Footer'

function App() {
  return (
    <div className="App container"> 
      <div className="main-wrapper">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <PostcodeToCcg />
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
}

export default App;
