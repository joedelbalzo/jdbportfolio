import React from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./Home";
import Nav from "./Nav";
import Links from './Links'

const App = () => {
  return (
    <div>
      {/* <Nav/> */}
      <Home/>
      <Links/>
    {/* <Routes>
      <Route path='/' element={ '/' } />
      <Route path='/home'/>
      <Route path='/links' element={ <Links /> } />
    </Routes> */}
    </div>
  )
}

export default App;
