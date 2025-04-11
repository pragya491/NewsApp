

import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import ErrorBoundary from './ErrorBoundary';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API_KEY

  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router>
        <div>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress} 
      />
        
        <ErrorBoundary>
        <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={5} country="us" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} pageSize={5} country="us" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={5} country="us" category="entertainment"/>} />
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} pageSize={5} country="us" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} pageSize={5} country="us" category="science"/>} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} pageSize={5} country="us" category="sports"/>} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} pageSize={5} country="us" category="technology" />} />
        </Routes>
        

        </ErrorBoundary>
        </div>
        
      </Router>
    )
  }
}