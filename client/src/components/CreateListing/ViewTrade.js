import React, { Component } from 'react';
import Redirect from '../redirect.js';
import axios from 'axios';
import './listing.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Carousel from 'react-material-ui-carousel';
import Modal from '@material-ui/core/Modal';




class ViewTrade extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'item_id':props.id.id};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/listings/trades/${this.state['item_id']}/${token}`)
        .then(res => {
            this.setState({...this.state, 'trade_info':res.data})
            console.log(res.data);
        })
        .catch(err =>  {
            console.log("error :(");
            console.log(err);
        })

    }

    // cardNumber: ""
    // cardSeries: ""
    // comments: ""
    // id: 4
    // manufacturer: "ACEO Reprint"
    // player_name: ""
    // sport: "Baseball"
    // time: "2020-07-25 12:25:15.454760"
    // tradeOrSell: "Trade"
    // username: "hello"
    // year: 2020






    render() {
        console.log(this.state)
        return (<div  className="home-container">
        {'trade_info' in this.state && 




            <Grid container spacing={3} alignItems="center"
            justify="center" >
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Paper className="left-hand-panel">
                        <div class="product-img">
                        <Carousel interval={3000}>
                            {this.state.trade_info.img_paths.map((path) =>
                                <div>
                                    <img style={{width: '100%', position: 'relative'}} src={path} />
                                </div>
                            )}
                            
                            </Carousel>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Paper className="right-hand-panel">
                        <div class="product-text">
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="h5" align="left">{this.state.trade_info['player_name']}</Typography>
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="subtitle1" align="left">Sport: {this.state.trade_info['sport']}</Typography>
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="subtitle1" align="left">Year: {this.state.trade_info['year']}</Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Paper className="right-hand-panel">
                        <div class="product-text">
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="h5" align="left">Manufacturer: {this.state.trade_info['manufacturer']}</Typography>
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="subtitle1" align="left">Card Number: {this.state.trade_info['cardNumber']}</Typography>
                            <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} 
                            variant="subtitle1" align="left">Card Set/Series: {this.state.trade_info['cardSeries']}</Typography>
                        </div>
                    </Paper>
                </Grid>

            </Grid>

        }



        </div>);
       
    }

}
export default ViewTrade;

