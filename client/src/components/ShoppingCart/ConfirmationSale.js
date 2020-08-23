import React, { Component } from 'react';
import Redirect from '../redirect.js';
import axios from 'axios';
import './shopping.css';
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
import { Carousel } from 'react-responsive-carousel';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Checkout from './Checkout.js';
import Modal from '@material-ui/core/Modal';
// import StripeCheckout from 'react-stripe-checkout';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeCheckout from "./StripeCheckout.js"



class ConfirmationSale extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'id':props.id}
    }


    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/sale_order_lookup/${this.state['id']}/${token}`)
        .then(res => {
            this.setState({...res.data});
            console.log(res.data);
        })
        .catch(err =>  {
            

        })

    }








    render() {

        if('redirectUrl' in this.state && this.state['redirectUrl']) {
            return (<Redirect {...this.state} url={this.state['redirectUrl']} />);
        }


        if('id' in this.state) {
                return (<div className="home-container">

                    
                    
                    </div>);
            }
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }



        
       
    }

}
export default ConfirmationSale;




