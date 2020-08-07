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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Divider from '@material-ui/core/Divider';
import './notifications.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {'tab':'pending'};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            console.log(res)
            this.setState({...this.state, ...res.data})
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
            // console.log(res.data)
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
            console.log(res.data);
            this.setState({...this.state, ...res.data})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })


    }


    handleChange = (event, new_val) => {
        this.setState({...this.state, 'tab':new_val})
    }



    render() {
        if('redirectUrl' in this.state && this.state['redirectUrl']) {
            return <Redirect {...this.state} url={this.state['redirectUrl']} />
        }
        if('pending_trades_out' in this.state) {
                if(this.state['tab'] == 'pending') {
                    return (<div className="home-container">
                    
                    <div>
                        <Tabs centered
                            value={this.state['tab']}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab value="pending" className="tabs-notif" label="Pending Orders" />
                            <Tab value="past" className="tabs-notif" label="Completed Orders" />
                        </Tabs>

                    </div>




                    <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Your Offers</Typography>
                            <Grid container className="notif-grid-container"
                                alignItems="center"
                                justify="center" spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                    {this.state['pending_trades_out'].length > 0 &&
                                        
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
                                    {!this.state['pending_trades_in'].length > 0 &&
                                    <h6>No Pending Offers at this time</h6>
                                }
                                    
                                        </List>
                                    </Paper>}
                                </Grid>
                            </Grid>
                    </div>

                    <div className="trade-in-notif-container">
                        <Typography className="notif-header" variant="h4">Your Listings</Typography>
                        <Grid container className="notif-grid-container"
                    alignItems="center"
                    justify="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                {this.state['pending_trades_in'].length > 0 &&
                                <Paper className="trade-in-notif-paper">
                                    <List className="notif-list">
                                {this.state['pending_trades_in'].map((offer,index) => 
                                    <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <ListItem key={`notif-trade-${index}`} dense>
                                        
                                        <Typography className="list-item-text mont-text">
                                            You offered <b>{offer.cards_to_be_traded.map(x => x.player_name).join(", ")} </b>
                                                to <b>{offer.recipient_username} </b> for <b>{offer.wanted_trade_card.player_name}</b>
                                        </Typography>

                                        <Typography className="list-item-status mont-text">
                                            Status: {offer.status}
                                        </Typography>


                                        </ListItem>
                                        <Divider />
                                    </div>
                                )}
                                {!this.state['pending_trades_in'].length > 0 &&
                                    <h6>No Pending Listings at this time</h6>
                                }
                                
                                    </List>
                                </Paper>}
                            </Grid>
                        </Grid>
                    </div>




                </div>)
            } else if(this.state['tab'] == 'past') {
                return (
                    <div className="home-container">
                        <div className="tabs-notif">
                            <Tabs centered
                                value={this.state['tab']}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                                aria-label="disabled tabs example"
                            >
                                <Tab value="pending" className="tabs-notif" label="Pending Orders" />
                                <Tab value="past" className="tabs-notif" label="Completed Orders" />
                            </Tabs>
                        </div>




                    <div className="margin-adjust">
                        <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Trades</Typography>
                            <Grid container className="past-order-grid-container"
                                alignItems="left"
                                justify="left" spacing={0} >

                                    {this.state['accepted_trades_out'].map((offer,index) => 
                                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                         <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                                <CardMedia
                                                    className="offer-img"
                                                    image={offer.wanted_trade_card['img_paths'][0]}
                                                    title="Paella dish"
                                                />


                                                <CardContent>
                                                    <Typography variant="h6" className="mont-text">
                                                        {offer.wanted_trade_card['year']+ " " + offer.wanted_trade_card['manufacturer'] + " " + offer.wanted_trade_card['cardSeries'] + " " + offer.wanted_trade_card['player_name']}
                                                    </Typography>
                                                </CardContent>


                                 
                                            </Card>
                                         </div>
  
                                    </Grid>
                                )}
                            </Grid>
                    </div>

                    <div className="trade-in-notif-container">
                        <Typography className="notif-header" variant="h4">Sales</Typography>
                        <Grid container className="notif-grid-container"
                    alignItems="center"
                    justify="center" spacing={2} >
                            {/* {this.state['accepted_trades_out'].map((offer,index) => 
                                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                         <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                                <CardMedia
                                                    className="offer-img"
                                                    image={offer.wanted_trade_card['img_paths'][0]}
                                                    title="Paella dish"
                                                />


                                                <CardContent>
                                                    <Typography variant="h6" className="mont-text">
                                                        {offer.wanted_trade_card['year']+ " " + offer.wanted_trade_card['manufacturer'] + " " + offer.wanted_trade_card['cardSeries'] + " " + offer.wanted_trade_card['player_name']}
                                                    </Typography>
                                                </CardContent>


                                 
                                            </Card>
                                         </div>
  
                                    </Grid>
                                )} */}
                        </Grid>
                    </div>


                    </div>













                    </div>


                );
            }

        } 
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }
       
    }

}
export default Notifications;

