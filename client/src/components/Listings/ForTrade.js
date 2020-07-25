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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './all_listings.css';
import Grid from '@material-ui/core/Grid';


class ForTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/all_listings/trades/${this.state['sport']}/${token}`)
        .then(res => {
            console.log(res.data.trades);
            this.setState({...this.state, 'trades':res.data.trades})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }



    render() {
        console.log(this.loggedIn)
        if('trades' in this.state) {
            return (<div className="home-container">
                              <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={0}>
                
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                        <Card className="track-card">
                                <CardMedia className="track-img" image="https://via.placeholder.com/150"></CardMedia>
                                <CardContent>
                                    
                                </CardContent>
                            </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>
            </div>);
        }
        else {
            return (<div className="home-container">
                        <CircularProgress style={{position: 'absolute', top: '40vh'}} />

                

            </div>);
        }
       
    }

}
export default ForTrade;

