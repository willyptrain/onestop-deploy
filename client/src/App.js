import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "./components/login/login.js";
import Home from "./components/home/Home.js";
import Signup from "./components/signup/signup.js";
import Redirect from './components/redirect.js';
import axios from 'axios';
import Navbar from './components/navbar/navbar.js';
import CreateListing from './components/CreateListing/CreateListing.js';
import ViewTrade from './components/CreateListing/ViewTrade.js';
import ViewSale from './components/CreateListing/ViewSale.js';
import ForTrade from './components/Listings/ForTrade';
import ForSale from './components/Listings/ForSale';
import Wanted from './components/Listings/Wanted';
import AboutPage from './components/About/AboutPage.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {userInfo: 'Not logged in', redirectUrl: null, launchModal: false};
  }


  async componentDidMount() {
    let token = localStorage.access_token;
        axios.get(`/api/users/${token}`)
        .then(res => {
            this.setState({...this.state, launchModal: false, 'userInfo': res.data})
        })
        .catch(err =>  {
            console.log(err)
            this.setState({...this.state, launchModal: true,'userInfo': 'Not logged in'})

        })
  }
  setUserInfo = (userInfo) => {
    console.log("userInfo");
    console.log(userInfo);
    this.setState({ 'userInfo':userInfo });
  }

  launchModal = (event) => {
      this.setState({...this.state, launchModal: event.currentTarget.value});
  }



  render() {
    const { userInfo } = this.state;


    return (
      <div style={{background: 'white'}} className="App">
        <header className="App-header">
        <Router>
          <div style={{height:'100%', width: '100%'}}>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
            <Switch>
              <Route exact path="/" component={(props) =>
                (userInfo == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}  loggedIn={userInfo != 'Not logged in'} />
                  <Home {...this.state} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                : <div>
                  <Navbar {...this.state} setModal={this.launchModal} loggedIn={userInfo != 'Not logged in'} />
                  <Home {...this.state} loginModal={this.state['launchModal']} userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div> )
              }/>
              <Route exact path="/login" component={(props) =>
                <Login {...this.state} userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
              }/>
              <Route exact path="/signup" component={(props) =>
                <Signup {...this.state} userInfo={this.state['userInfo']} redirectUrl={this.state.userInfo.redirectUrl} setUserInfo={this.setUserInfo} />
              }/>
              <Route exact path="/create_listing">
                <Navbar {...this.state} loggedIn={userInfo != 'Not logged in'} />
                <CreateListing {...this.state} userInfo={this.state['userInfo']} />
              </Route>

              <Route exact path="/view_listing/trades/:id" render={(props) =>
                <div>
                  <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />
                  <ViewTrade {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
              }/>
              <Route exact path="/view_listing/sales/:id" render={(props) =>
                <div>
                  <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />
                  <ViewSale {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
              }/>
              <Route exact path="/for_trade/:sport"  render={(props) =>
                  <div>
                    <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />
                    <ForTrade {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                }/>
              <Route exact path="/for_sale/:sport"  render={(props) =>
                  <div>
                    <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />
                    <ForSale {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                }/>
              <Route exact path="/wanted/:sport"  render={(props) =>
                  <div>
                    <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />
                    <Wanted {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                }/>
              <Route exact path="/about">
                  <Navbar  {...this.state}  loggedIn={userInfo != 'Not logged in'} />  
                  <AboutPage {...this.state} />
              </Route>



            </Switch>
          </div>
        </Router>
  
        </header>
      </div>
    );

  }
}

export default App;