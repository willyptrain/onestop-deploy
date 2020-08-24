import React, { Component } from 'react';
import Redirect from '../redirect.js';
import axios from 'axios';
import './all_listings.css';
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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import TradeBox from './TradeBox.js';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

//Taken from Material UI: 
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ViewForTradeItem extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'item_id':props.id.id, 'tab':'details', 'open':false, 'tradeSent':false};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/trade_lookup/${this.state['item_id']}/${token}`)
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


    changeTab = (event, new_val) => {
        this.setState({...this.state, 'tab':new_val})
    }
    handleClose = () => {
        this.setState({...this.state,'open':false});
    }
    open = () => {
        this.setState({...this.state, 'open': true})
    }




    offerTrade = (checked_ids) => {
        let token = localStorage.access_token;
        console.log(checked_ids);
        let poster_username = this.state['trade_info']['username']
        let card_id = this.state['trade_info']['id']
        axios.get(`/api/make_trade_offer/${card_id}/${checked_ids}/${poster_username}/${token}`)
        .then(res => {
            console.log(res.data);
            // this.setState({...this.state, 'tradeSent':true, 'yourOffer':res.data.trades})
        })
        .catch(err =>  {
            console.log("error :(");
            this.setState({...this.state, 'tradeSent':true, 'error':err})
            console.log(err);
        })

        this.setState({...this.state,'open':false});
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({...this.state, 'tradeSent':false})
        
      };



    render() {
        


        return (<div  className="home-container">
        {'trade_info' in this.state && 

        <div>
            <div>
                <Modal
                open={this.state['open']}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                    
                    <Grid container className="grid-container"
                alignItems="center"
                justify="center" spacing={3}>
                        <Grid item xs={10} sm={6} md={6} lg={6}>

                            <TradeBox {...this.state} offerTrade={this.offerTrade} />

                        </Grid>
                    </Grid>
                </Modal>
            </div>


        <div>

            <Grid container spacing={3} alignItems="center"
            justify="center" >
                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                            <Button color="secondary" size="large" variant="contained" onClick={this.open} className="button-item">Offer Trade</Button>
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
                </Grid>

            </Grid>
        </div>
        <Snackbar open={this.state['tradeSent']} autoHideDuration={3000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    </div>  
        }




        </div>);
       
    }

}
export default ViewForTradeItem;

