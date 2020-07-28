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
                    <Divider classes="divider-quote" />
                </Grid>
            </Grid>
                

        </div>)
       
    }

}
export default AboutPage;

