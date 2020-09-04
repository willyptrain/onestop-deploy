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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



class ViewTrade extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'item_id':props.id.id, 'tab': 'details'};
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
            this.setState({'error': err})
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


    changeTab = (event, new_val) => {
        this.setState({...this.state, 'tab':new_val})
    }

    deleteTrade = (event) => {
        let deleteItem = window.confirm("Are you sure you wanted to delete this card?")
        if(deleteItem && 'item_id' in this.state) {
            let token = localStorage.access_token;
            axios.post(`/api/user/delete/trade/${token}`, {'item_id':this.state['item_id']})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log("error");
                console.log(err);
                this.setState({'error': err})
            })
        }
    }


    render() {
        console.log(this.state)
        return (<div  className="home-container">
        {'trade_info' in this.state && 

<div className="flex-container">
    {/* <Grid item xs={12} sm={6} md={6} lg={4}> */}
        <Paper className="left-hand-panel">
            <div class="product-img">
            <Carousel indicators={false} navButtonsAlwaysVisible={false} interval={3000}>
                {this.state.trade_info.img_paths.map((path) =>
                    <div>
                        <img style={{ position: 'relative'}} src={path} />
                    </div>
                )}
                
                </Carousel>
            </div>
        </Paper>
    {/* </Grid> */}
    {/* <Grid item xs={12} sm={6} md={6} lg={4}> */}
        <Paper className="right-hand-panel">
            <div class="product-top-text">
                <Typography className="player-text"
                variant="h3" align="left">{this.state.trade_info['player_name']}</Typography>
                <Typography className="sport-text" 
                variant="subtitle1" align="left">Sport: {this.state.trade_info['sport']}</Typography>
                <Typography className="year-text" 
                variant="subtitle1" align="left">Year: {this.state.trade_info['year']}</Typography>
            </div>

            <div style={{top: '56vh'}} className="button-below-img">
                { this.state.trade_info.for_trade && 
                    <Button disabled={this.state.trade_info.for_trade ? false : true} color="danger" size="large" variant="contained" 
                        onClick={() => window.location = `/create_listing/edit/trade/${this.state['item_id']}`} className="edit-button-item">
                    {this.state.trade_info.for_trade ? "Edit" : "Sold"}
                    </Button>

                }
                <Button disabled={this.state.trade_info.for_trade ? false : true} color="danger" size="large" variant="contained" onClick={this.deleteTrade} className="danger-button-item">
                {this.state.trade_info.for_trade ? "Delete" : "Sold"}
                </Button>
            </div>
            
            <div className="item-details-tabs">
                
                    <div style={{width: '100%'}}>
                        <Tabs className="tabs-details"
                            value={this.state['tab']}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.changeTab}
                            aria-label="disabled tabs example"
                        >
                            <Tab value="details" label="details" />
                            <Tab value="comments" label="comments"  />
                        </Tabs>
                    </div>

                {this.state['tab'] == "details" && 
                <div class="product-text">
                    <Typography className="manufacturer-text" 
                    variant="h5" align="left">Manufacturer: {this.state.trade_info['manufacturer']}</Typography>
                    <Typography className="cardNumber-text" 
                    variant="subtitle1" align="left">Card Number: {this.state.trade_info['cardNumber']}</Typography>
                    <Typography className="cardSeries-text" 
                    variant="subtitle1" align="left">Card Set/Series: {this.state.trade_info['cardSeries']}</Typography>
                </div>
                }
                {this.state['tab'] == "comments" && 
                <div class="product-text">
                    <Typography className="manufacturer-text" 
                    variant="body1" align="left">{this.state.trade_info['comments']}</Typography>
                    
                </div>
                }
            </div>


        </Paper>
    {/* </Grid> */}

</div>
        }
        {!('trade_info' in this.state) && 
        'error' in this.state && 
        <h4>
            User not authenticated or Trade not found
        </h4>
        
        }



        </div>);
       
    }

}
export default ViewTrade;

