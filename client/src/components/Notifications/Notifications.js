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


class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            console.log(res)
            this.setState({...this.state, 
                            'pending_trades_out': res.data.pending_trades_out, 
                            'pending_trades_in': res.data.pending_trades_in})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })

    }
    
    acceptOffer = (event) => {
        let token = localStorage.access_token;
        axios.get(`/api/accept_trade_offer/${event.currentTarget.value}/${token}`)
        .then(res => {
            console.log(res.data)
            this.setState({...this.state, 
                'redirectUrl':`/confirmation/${res.data.id}`
            })
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })


    }

        
    denyOffer = (event) => {
        let token = localStorage.access_token;
        axios.get(`/api/deny_trade_offer/${event.currentTarget.value}/${token}`)
        .then(res => {
            this.setState({...this.state, 
                'pending_trades_out': res.data.pending_trades_out, 
                'pending_trades_in': res.data.pending_trades_in})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })


    }






    render() {
        if('redirectUrl' in this.state && this.state['redirectUrl']) {
            return <Redirect {...this.state} url={this.state['redirectUrl']} />
        }
        if('pending_trades_out' in this.state && this.state['pending_trades_out'].length > 0) {
            return (<div className="home-container">
                <div className="trade-out-notif-container">
                    <Typography className="notif-header" variant="h4">Your Offers</Typography>
                        <Grid container className="notif-grid-container"
                            alignItems="center"
                            justify="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                <Paper className="trade-in-notif-paper">
                                    <List className="notif-list">
                                {this.state['pending_trades_out'].map((offer,index) => 
                                    <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <ListItem key={`notif-trade-${index}`} dense>
                                        
                                        <Typography className="list-item-text">
                                            You offered <b>{offer.cards_to_be_traded.map(x => x.player_name).join(", ")} </b>
                                                to <b>{offer.recipient_username} </b> for <b>{offer.wanted_trade_card.player_name}</b>
                                        </Typography>

                                        <Button variant="contained" onClick={this.acceptOffer} value={offer.id} className="accept-button" color="primary">Accept</Button>
                                        <Button variant="contained" onClick={this.denyOffer} value={offer.id} className="deny-button" color="secondary">Decline</Button>    
                                            
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )}
                                
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                </div>

                <div className="trade-in-notif-container">
                    <Typography className="notif-header" variant="h4">Your Listings</Typography>
                    <Grid container className="notif-grid-container"
                alignItems="center"
                justify="center" spacing={2} >
                        <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                            <Paper className="trade-in-notif-paper">
                                <List className="notif-list">
                            {this.state['pending_trades_in'].map((offer,index) => 
                                <div style={{width: '94%', marginLeft: '2rem'}}>
                                    <ListItem key={`notif-trade-${index}`} dense>
                                    
                                    <Typography className="list-item-text">
                                        You offered <b>{offer.cards_to_be_traded.map(x => x.player_name).join(", ")} </b>
                                            to <b>{offer.recipient_username} </b> for <b>{offer.wanted_trade_card.player_name}</b>
                                    </Typography>

                                    <Button variant="contained" onClick={this.acceptOffer} value={offer.id} className="accept-button" color="primary">Accept</Button>
                                    <Button variant="contained" onClick={this.denyOffer} value={offer.id} className="deny-button" color="secondary">Decline</Button>    
                                        
                                    </ListItem>
                                    <Divider />
                                </div>
                            )}
                            
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>




            </div>)

        } else if('pending_trades_out' in this.state && this.state['pending_trades_out'].length == 0) {
            return (<div className="home-container">
                <h4>No Pending Trades</h4>
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

