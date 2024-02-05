import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import NewsComponent from './Components/NewsComponent';
import LoadingBar from 'react-top-loading-bar'
import { 
  BrowserRouter as Router, 
  Switch,
  Route } from "react-router-dom";
export default class App extends Component {

  size=9;
  state={progress:0}
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       
      />
       <Navbar/>
       <div className="container my-3">
       <Switch>
    <Route exact path="/"><NewsComponent setprogress={this.setProgress}key="general" pageSize={this.size} country="in" category="general"/> </Route>
    <Route exact path="/business"><NewsComponent setprogress={this.setProgress}key="business" pageSize={this.size} country="in" category="business"/> </Route>
    <Route exact path="/entertainment"><NewsComponent setprogress={this.setProgress}key="entertainment" pageSize={this.size} country="in" category="entertainment"/> </Route>
    <Route exact path="/general"><NewsComponent setprogress={this.setProgress}key="general" pageSize={this.size} country="in" category="general"/> </Route>
    <Route exact path="/health"><NewsComponent setprogress={this.setProgress}key="health" pageSize={this.size} country="in" category="health"/> </Route>
    <Route exact path="/science"><NewsComponent setprogress={this.setProgress}key="science" pageSize={this.size} country="in" category="science"/> </Route>
    <Route exact path="/sports"><NewsComponent setprogress={this.setProgress}key="sports" pageSize={this.size} country="in" category="sports"/> </Route>
    <Route exact path="/technology"><NewsComponent setprogress={this.setProgress}key="technology" pageSize={this.size} country="in" category="technology"/> </Route>
   
    </Switch>
      
       </div >
       </Router>
      </div>
    )
  }
}
