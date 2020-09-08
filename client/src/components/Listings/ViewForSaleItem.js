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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';



class ViewForSaleItem extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'item_id':props.id.id, 'tab':'details'}
    }

    // 'username' 'id' 'sport' 'player_name' 'year' 'manufacturer' 'cardNumber'
    //  'cardSeries' 'comments' 'tradeOrSell' 'price'  'time'

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/sale_lookup/${this.state['item_id']}/${token}`)
        .then(res => {
            this.setState({...this.state, 'sale_info':res.data})
            console.log(res.data);
        })
        .catch(err =>  {
            console.log("error :(");
            console.log(err);
        })

    }

    changeTab = (event, new_val) => {
        this.setState({...this.state, 'tab':new_val})
    }


    addSaleToCart = (event) => {

        let cart = JSON.parse(localStorage.cart);
        let sale_id = event.currentTarget.value

        if(!cart[sale_id]) {
            cart[sale_id] = this.state['sale_info']
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            //throw error, not allowed
            console.log("Already in cart !");
            console.log(cart[sale_id]);
            console.log(cart[sale_id].player_name);


        }
        
      }















    render() {
        console.log(this.state)
        return (<div className="home-container">
        {'sale_info' in this.state && 

        
    <div className="flex-container" style={{height: '100%'}}>
    {/* <Grid item xs={12} sm={6} md={6} lg={4}> */}
        <Paper className="left-hand-panel" style={{height: '75vh'}}>
            <div class="product-img" style={{height: '100%'}}>
            <Carousel style={{height: '100%'}} className="carousel-img-display" interval={null}>
                {this.state.sale_info.img_paths.map((path) =>
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
                variant="h3" align="left">{this.state.sale_info['player_name']}</Typography>
                <Typography className="sport-text" 
                variant="subtitle1" align="left">Sport: {this.state.sale_info['sport']}</Typography>
                <Typography className="year-text" 
                variant="subtitle1" align="left">Year: {this.state.sale_info['year']}</Typography>
            
            </div>
            <div className="price-container">
                <Typography className="price-text"
                variant="h3" align="left">Price: ${this.state.sale_info['price']}</Typography>
            </div>


            <div style={{top: '52vh'}} className="button-below-img">
                <Button color="secondary" onClick={this.addSaleToCart} value={this.state.sale_info.id} size="large" variant="contained" className="button-item">Add To Cart</Button>
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
                    variant="h5" align="left">Manufacturer: {this.state.sale_info['manufacturer']}</Typography>
                    <Typography className="cardNumber-text" 
                    variant="subtitle1" align="left">Card Number: {this.state.sale_info['cardNumber']}</Typography>
                    <Typography className="cardSeries-text" 
                    variant="subtitle1" align="left">Card Set/Series: {this.state.sale_info['cardSeries']}</Typography>
                </div>
                }
                {this.state['tab'] == "comments" && 
                <div class="product-text">
                    <Typography className="manufacturer-text" 
                    variant="body1" align="left">{this.state.sale_info['comments']}</Typography>
                    
                </div>
                }
            </div>


        </Paper>
    </div>


        }



        </div>);
       
    }

}
export default ViewForSaleItem;

