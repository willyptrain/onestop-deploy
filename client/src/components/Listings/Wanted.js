import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'

class Wanted extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        // axios.get(`/api/users/${token}`)
        // .then(res => {
        //     this.setState()
        // })
        // .catch(err =>  {
        //     this.setState({'open': true})

        // })

    }



    render() {
        console.log(this.loggedIn)
        return (<div className="home-container">
            
                <p>Wanted</p>

        </div>)
       
    }

}
export default Wanted;
