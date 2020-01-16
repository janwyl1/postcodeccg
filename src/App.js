import React from 'react';
// import logo from './logo.svg';
import './App.css';
import PostcodeToCcg from './PostcodeToCcg'
import Header from './Header'
import Footer from './Footer'

function App() {
  return (
    <div className="App"> 
      <Header />
      <PostcodeToCcg />
      <Footer />
    </div>
  );
}

export default App;
