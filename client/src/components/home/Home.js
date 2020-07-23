import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
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

class Home extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.loggedIn = props.loggedIn;
        this.state = {'open': false}; 
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            this.setState()
        })
        .catch(err =>  {
            this.setState({'open': true})

        })

    }

    open = () => {
        this.setState({'open': true})
    }
    handleClose = () => {
        this.setState({'open': false})
      };
    

    render() {
        console.log(this.loggedIn)
        return (<div className="home-container">
            
                <Modal
                open={this.state['open']}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                    <Login {...this.state} userInfo={this.state['userInfo']} setUserInfo={this.setUserInfo} /> 
            
              </Modal>
            
            <Carousel interval={1000000000}>
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

        </div>)
       
    }

}
export default Home;

