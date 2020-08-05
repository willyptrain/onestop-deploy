import React, { Component } from 'react';
import { FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import './notifications.css';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Box from '@material-ui/core/Box';


class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {'offer_id':props.offer_id};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/get_trade_offer/${this.state['offer_id']}/${token}`)
        .then(res => {
            console.log(res.data)
            this.setState({...this.state, ...res.data});

        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })

    }







    render() {
        if('cards_to_be_traded' in this.state) {
            return (<div className="home-container">
                
                <Grid container spacing={3} alignItems="center"
            justify="center" >
                <Grid item xs={12} sm={12} md={12} lg={12} className="confirmation-grid">
                    <div>
                        <Paper className="confirmation-paper">
                            <Box mx="auto">
                                        <CloudDoneIcon style={{fontSize: 80}} className="cloud-icon" />
                                    <Typography className="order-success-confirm-text" variant="h3">
                                        Order Successful!
                                    </Typography>
                                    <Typography className="order-number-text" variant="h6">
                                        Order Number: #12345
                                    </Typography>
                                    <Divider className="order-number-divider" />
                                    <div className="wanted-card-confirm">
                                        <Avatar alt="Card Image" className="wanted-card-confirm-img" src={this.state['wanted_trade_card']['img_paths'][0]} />
                                        <Typography className="wanted-card-confirm-name" variant="h6">
                                            Order Number: #12345
                                        </Typography>
                                    </div>


                            </Box>
                    
                        </Paper>
                    </div>
                </Grid>
            </Grid>
















            </div>)

        } 
        
        
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }
       
    }

}
export default Notifications;

