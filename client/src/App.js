import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
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
import ViewForTradeItem from './components/Listings/ViewForTradeItem';
import ViewForSaleItem from './components/Listings/ViewForSaleItem';
import Wanted from './components/Listings/Wanted';
import AboutPage from './components/About/AboutPage.js'
import MyListings from './components/Listings/MyListings.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notifications from './components/Notifications/Notifications.js'
import ConfirmationPage from './components/Notifications/ConfirmationPage.js'
import ShoppingCart from './components/ShoppingCart/ShoppingCart.js';
import Checkout from './components/ShoppingCart/Checkout.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {redirectUrl: null, launchModal: false};
  }


  async componentDidMount() {

    let token = localStorage.access_token;
        axios.get(`/api/users/${token}`)
        .then(res => {
            // if(localStorage.getItem('cart')) {
            //   console.log("1")
            //   this.setState({...this.state, 
            //     launchModal: false, 
            //     'status':"logged in",
            //     'userInfo': res.data, 
            //     'cart': JSON.parse(localStorage.getItem('cart'))
            //   })
            // }
            // else {
            //   console.log("2")
            //   localStorage.setItem('cart', {})
            //   this.setState({...this.state, 
            //     launchModal: false, 
            //     'status':"logged in",
            //     'userInfo': res.data, 
            //     'cart': {}
            //   });
            // }
            // this.setState({...this.state, 
            //   launchModal: false, 
            //   'status':"logged in",
            //   'userInfo': res.data, 
            //   'cart': JSON.parse(localStorage.getItem('cart'))
            // })
            if(!localStorage.getItem('cart')) {
              localStorage.setItem('cart', JSON.stringify({}))
            }

            this.setState({...this.state, launchModal: false, 'status':"logged in",'userInfo': res.data})
        })
        .catch(err =>  {
            console.log(err)
            this.setState({...this.state, launchModal: true,'status': 'Not logged in'})

        })
  }














  setUserInfo = (userInfo) => {
    console.log(userInfo);
    this.setState({ 'userInfo':userInfo });
  }

  launchModal = (event) => {
      this.setState({...this.state, launchModal: event.currentTarget.value});
  }



  render() {
    const { userInfo } = this.state;
    if('status' in this.state) {
      console.log(this.state.status)
    }

    if(!this.state['status']) {
      return (<div style={{"textAlign":"center", "position":"relative", "top":"30vh"}}>
        <CircularProgress />
        
      </div>)
    }
    else {

    return (
      <div style={{background: 'white'}} className="App">
        <header className="App-header">
        <Router>
          <div style={{height:'100%', width: '100%'}}>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
            <Switch>
              <Route exact path="/" component={(props) =>
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                : <div>
                  <Navbar {...this.state} setModal={this.launchModal} loggedIn={this.state.status != 'Not logged in'} />
                  <Home {...this.state} redirectUrl={`/`} loginModal={this.state['launchModal']} userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div> )
              }/>
              <Route exact path="/signup" component={(props) =>
                <Signup {...this.state} userInfo={this.state['userInfo']} redirectUrl={this.state.redirectUrl} setUserInfo={this.setUserInfo} />
              }/>
              <Route exact path="/create_listing">
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/create_listing`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
            }
            { this.state.status != 'Not logged in' && 
                <div>
                <Navbar {...this.state} loggedIn={this.state.status != 'Not logged in'} />
                <CreateListing {...this.state} edit={false} userInfo={this.state['userInfo']} />
                </div>
            }
              </Route>
              <Route exact path="/create_listing/edit/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/create_listing/edit/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <CreateListing {...this.state} edit={true} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>
              <Route exact path="/create_listing/edit/trade/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/create_listing/edit/trade/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <CreateListing {...this.state} edit={true} type={"trade"} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>
              <Route exact path="/create_listing/edit/sale/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} launchModal={this.state['launchModal']} redirectUrl={`/create_listing/edit/sale/${props.match.params.id}`}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <CreateListing {...this.state} edit={true} type={"sale"} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>

              <Route exact path="/shopping_cart">
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/shopping_cart`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
              }
              { this.state.status != 'Not logged in' && 
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />  
                  <ShoppingCart userInfo={this.state['userInfo']} />
                </div>
              } 

              </Route>

              <Route exact path="/notifications">
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/notifications`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
              }
              { this.state.status != 'Not logged in' && 
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />  
                  <Notifications userInfo={this.state['userInfo']} />
                </div>
              } 

              </Route>



              {/* <Route exact path="/checkout">
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/shopping_cart`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
              }
              { this.state.status != 'Not logged in' && 
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />  
                  <Checkout {...this.state} userInfo={this.state['userInfo']} />
                </div>
              } 

              </Route> */}




















              <Route exact path="/confirmation/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/confirmation/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <ConfirmationPage {...this.state} order_id={props.match.params.id} userInfo={this.state['userInfo']} />
                </div>
                )}/>






              <Route exact path="/view_listing/trades/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/view_listing/trades/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <ViewTrade {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>
              <Route exact path="/view_listing/sales/:id" render={(props) =>
                
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/view_listing/sales/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <ViewSale {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>

              <Route exact path="/for_sale/item/:id" render={(props) =>
                
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={false} />
                  <Home {...this.state} redirectUrl={`/for_sale/item/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                <div>
                  <Navbar  {...this.state}  loggedIn={true} />
                  <ViewForSaleItem {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>
              <Route exact path="/for_trade/item/:id" render={(props) =>
                (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/for_trade/item/${props.match.params.id}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                
                
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                  <ViewForTradeItem {...this.state} id={props.match.params} userInfo={this.state['userInfo']} />
                </div>
                )}/>


              <Route exact path="/for_trade/:sport"  render={(props) =>
                  (this.state.status == 'Not logged in' ? 
                  <div>
                    <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                    <Home {...this.state} redirectUrl={`/for_trade/${props.match.params.sport}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                  </div>
                  
                  :
                  
                  
                  <div>
                    <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                    <ForTrade {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                  )}/>
              <Route exact path="/for_sale/:sport"  render={(props) =>
                  
                  
                  (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} launchModal={this.state['launchModal']} redirectUrl={`/for_sale/${props.match.params.sport}`}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                  
                  <div>
                    <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                    <ForSale {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                  )}/>
              <Route exact path="/wanted/:sport"  render={(props) =>
                  
                  (this.state.status == 'Not logged in' ? 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/wanted/${props.match.params.sport}`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
                :
                  
                  
                  <div>
                    <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />
                    <Wanted {...this.state} sport={props.match.params} loggedIn={userInfo != 'Not logged in'}  />
                  </div>
                  )}/>
              <Route exact path="/about">
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/about`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
              }
              { this.state.status != 'Not logged in' && 
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />  
                  <AboutPage {...this.state} />
                </div>
              } 
              </Route>
              <Route exact path="/my_listings">
                  
              { this.state.status == 'Not logged in' && 
                <div>
                  <Navbar  {...this.state} setModal={this.launchModal}   loggedIn={this.state.status == "logged in"} />
                  <Home {...this.state} redirectUrl={`/my_listings`} launchModal={this.state['launchModal']}  userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} />
                </div>
                
              }
              { this.state.status != 'Not logged in' && 
                <div>
                  <Navbar  {...this.state}  loggedIn={this.state.status != 'Not logged in'} />  
                  <MyListings {...this.state} />
                </div>
            }
              </Route>



            </Switch>
          </div>
        </Router>
  
        </header>
      </div>
    );
          }

  }
}

export default App;