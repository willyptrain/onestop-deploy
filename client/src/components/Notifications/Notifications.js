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


class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {'id': props.id.id}
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            console.log(res)
            this.setState({...this.state, 
                            'trades_out': res.data.trades_out, 'trades_in': res.data.trades_in})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })

    }




    render() {
        if('trades_out' in this.state) {
            return (<div className="home-container">
                <div className="trade-out-notif-container">
                    <Paper className="trade-out-notif-paper">
                    {this.state['trades_out'].map((offer,index) => 
                        <p>{offer.sender_username} offered {offer.cards_to_be_traded.map(x => x.player_name).join(", ")}
                        &nbsp;for {offer.wanted_trade_card.player_name}</p>
                    
                    )}
                    </Paper>
                </div>

                <div className="trade-in-notif-container">
                    <Paper className="trade-in-notif-paper">
                    {this.state['trades_in'].map((offer,index) => 
                        <p>You offered {offer.cards_to_be_traded.map(x => x.player_name).join(", ")} 
                            &nbsp;to {offer.recipient_username} for {offer.wanted_trade_card.player_name}</p>
                    
                    )}
                    </Paper>
                </div>




            </div>)

        } else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }
       
    }

}
export default Notifications;

