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
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import TradeBox from './TradeBox.js';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { CircularProgress } from '@material-ui/core';



//Taken from Material UI: 
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ViewForTradeItem extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'item_id':props.id.id, 'tab':'details', 'open':false, 'tradeSent':false, 'loading': false, 'offerSuccess':false};
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
        let poster_username = this.state['trade_info']['username']
        let card_id = this.state['trade_info']['id']
        axios.get(`/api/make_trade_offer/${card_id}/${checked_ids}/${poster_username}/${token}`)
        .then(res => {
            console.log(res.data);
            // this.setState({...this.state, 'tradeSent':true, 'yourOffer':res.data.trades})
            this.setState({...this.state, 'offerSuccess': true})
        })
        .catch(err =>  {
            console.log("error :(");
            this.setState({...this.state, 'offerSuccess':false, 'error':err})
            console.log(err);
        })
        this.setState({...this.state,'open':false});
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({...this.state, 'offerSuccess':false})
        
      };



    render() {
        

        if(!this.state['loading']) {
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
                
        <div className="flex-container" style={{height: '100%'}}>
            {/* <Grid item xs={12} sm={6} md={6} lg={4}> */}
    
    
    
    
    
            
                <Paper className="left-hand-panel" style={{height: '75vh'}}>
                    <div class="product-img" style={{height: '100%'}}>
                    <Carousel style={{height: '100%'}} className="carousel-img-display" interval={null}>
                        {this.state.trade_info.img_paths.map((path) =>
                        <Carousel.Item className="carousel-img">
                            <Image className="carousel-img-inner" src={path} />
                        </Carousel.Item>
                            
    
                        )}
                        
                        </Carousel>
                    </div>
                </Paper>
    
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

    
        </div>
        </div>
        }
                {this.state['offerSuccess'] && 
                    <div style={{width: 'max-content'}}>
                        <Snackbar
                            classes={{root: 'green-snackbar'}}
                            open={this.state.offerSuccess}
                            onClose={this.handleClose}
                            anchorOrigin={{ vertical:'top', horizontal:'right' }}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                                'className': 'green-snackbar',
                                'classes': {root: 'green-snackbar'}
                            }}
                            message={<span id="message-id">Trade Offer Successful</span>}
                        />
                    </div>
                }
                {!this.state['offerSuccess'] && this.state['error'] &&
                    <div style={{width: 'max-content'}}>
                        <Snackbar
                            classes={{root: 'danger-snackbar'}}
                            open={!this.state['offerSuccess'] && this.state['error']}
                            onClose={this.handleClose}
                            anchorOrigin={{ vertical:'top', horizontal:'right' }}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                                'className': 'green-snackbar',
                                'classes': {root: 'green-snackbar'}
                            }}
                            message={<span id="message-id">Error Making Trade</span>}
                        />
                    </div>
                }
    
            </div>);
        } else {
            return (<div>
                <CircularProgress />
            </div>)
        }
        
       
    }

}
export default ViewForTradeItem;

