import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import "./about.css";
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


class AboutPage extends Component {

    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        // let token = localStorage.access_token;
        // console.log(token);
        // axios.get(`/api/users/${token}`)
        // .then(res => {
        //     console.log(res)
        //     this.setState()
        // })
        // .catch(err =>  {
        //     console.log(err);
        //     this.setState({'open': true})

        // })

    }


    render() {
        return (<div className="home-container">
            <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={3}>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                    <div className="about-text">
                        <Typography variant="h2" paragraph gutterBottom className="about-quote">
                        “President Bush left for Canada today to attend a trade summit.  Reportedly, the trade summit got off to an awkward start when the  president pulled out his baseball cards.”
                        </Typography>
                        <Typography variant="h5" className="about-quote-author">
                        — Conan O’Brien
                        </Typography>
                    </div>
                    <div className="divider-quote">
                        <Divider />
                    </div>
                    <Typography variant="h5" paragraph gutterBottom className="about-us">
                    We’re just two guys who love buying, selling, and trading sports cards; together we have been doing it for several decades, but we noticed a problem in the card trading industry. We realized there was no insurance when trading cards, and specifically no site set up solely for the buying and selling of cards. Well we’re here to fix that!  Trading and selling through us is made easy and more importantly safe! We can guarantee that when making trades the cards you get are the cards you agreed upon. On top of that, our website is meant solely for trading cards. So forget selling through eBay or trading through reddit, we are here specifically for cards and specifically for you!
                    </Typography>
                </Grid>
            </Grid>
                

        </div>)
       
    }

}
export default AboutPage;

