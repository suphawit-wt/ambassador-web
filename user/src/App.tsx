import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsFrontend from 'pages/ProductsFrontend';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsFrontend />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
