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



    render() {
        console.log(this.state)
        return (<div>


            <p style={{color: 'black'}}>Yep</p>





        </div>);
       
    }

}
export default ViewTrade;

