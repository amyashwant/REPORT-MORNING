//import logo from './logo.svg';
import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=>  {

  let pageSize=5
  let country="in"
  let apiKey=process.env.REACT_APP_NEWS_API
  
     const[progress,setProgress]=useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        // progress={10}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
          {/* <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress}key="sports" pageSize={pageSize} country={country} category=" " />} /> */}
          
           <Route exact path="/science"      element ={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country={country} category="science" />}/>
           <Route exact path="/entertainment"element ={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />}/>
           <Route exact path="/business"     element ={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country={country} category="business" />}/>
           <Route  path="/"                  element ={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country={country} category="general" />}/>
           <Route  path="/general"           element ={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country={country} category="general" />}/>
           <Route exact path="/health"       element ={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country={country} category="health" />}/>
           <Route exact path="/technology"   element ={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country={country} category="technology" />}/>
           <Route exact path="/sports"       element ={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country={country} category="sports" />}/>
          
          
          
          
          
          </Routes>
        </Router>
      </div>
    );
  
}
export default App;
