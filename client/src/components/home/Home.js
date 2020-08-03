import React, { Component } from 'react';
import { FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import "./home.css";
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import saleImage from '../../images/SaleHome.png'
import tradeImage from '../../images/TradeHome.jpg'
import Button from '@material-ui/core/Button';


class Home extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.loggedIn = props.loggedIn;
        this.state = {'open': props.launchModal, 'redirectUrl':props.redirectUrl}; 
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            console.log(res)
            this.setState()
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'open': true})

        })

    }

    open = () => {
        this.setState({'open': true})
    }
    handleClose = () => {
        this.setState({'open': false})
      };
    

    render() {
        return (<div className="home-container">
        
                <Modal
                open={this.state['open']}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                    
                    <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={3}>
            <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Login {...this.state} userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} /> 
            
                    </Grid>
        </Grid>
              </Modal>
          
        <div>
            <Carousel interval={3000}>
                <Paper className="carousel-paper" key={1}>
                    <img className="carousel-img" src={carousel1} />
                </Paper>
                <Paper className="carousel-paper" key={2}>
                    <img className="carousel-img" src={carousel2} />
                </Paper>
                <Paper className="carousel-paper" key={3}>
                    <img className="carousel-img" src={carousel3} />
                </Paper>
            </Carousel>
        </div>
        <div className="homepage-walkthrough">
            
                <div className="for-trade-brief">
                <Grid container className="for-trade-brief-container"
                  alignItems="center"
                  justify="center">
                    <Grid item xs={12} sm={6} md={6} lg={6} className="grid-trade-text">
                    <div className="text-container-home">
                        <Typography variant="h4" align="center" paragraph gutterBottom className="for-trade-text">
                            Trading is made easy and safe through our website. On our platform, we 
                            offer insurance behind your trades. As avid collectors and traders outselves, we know
                            that all too many times people will tell you they want to make a trade, only to 
                            never send their cards, leaving you empty handed. Our goal is to guarantee this never happens,
                            serving as the midde-men to ensure you get the cards you want in the condition 
                            in which you agreed!
                        </Typography>
                        </div>
                        <Button className="launch-trade-btn" variant="outlined" color="default">View our For Trade Page</Button>
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <img className="home-trade-image" src={tradeImage}/>
                    </Grid>
                    </Grid>
                </div>
                <div className="for-sale-brief">
                <Grid container className="for-sale-brief-container"
                  alignItems="center"
                  justify="center">
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <img className="home-sale-image" src={saleImage}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div className="text-container-home">
                            <Typography variant="h4" align="center" paragraph gutterBottom className="for-sale-text">
                            We are not only here for trades, but we for sales too! Through our website,
                            you can list and sell your own cards with ease. 
                            </Typography>
                        </div>
                        <Button className="launch-sale-btn" variant="outlined" color="default">View our For Sale Page</Button>

                    </Grid>
                    </Grid>
                </div>




        </div>


        </div>)
       
    }

}
export default Home;

