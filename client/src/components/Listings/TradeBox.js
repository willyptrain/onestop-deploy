import React, { Component } from 'react';
import {FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import './all_listings.css';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';


class TradeBox extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {'offerTrade': props.offerTrade, 'trade_info':props.trade_info, 'checked': []}
    }

    async componentDidMount() {

        let token = localStorage.access_token;
        axios.get(`/api/my_listings/trades/${token}`)
        .then(res => {
            this.setState({...this.state, 'my_trades':res.data.trades})
            console.log(res.data);
        })
        .catch(err =>  {
            console.log("error :(");
            console.log(err);
        })

    }

    handleToggle = (index) => () => {
        let currentIndex = this.state['checked'].indexOf(index);
        let new_checked = [...this.state['checked']];
    
        if (currentIndex === -1) {
            new_checked.push(index);
        } else {
            new_checked.splice(currentIndex, 1);
        }
    
        this.setState({...this.state, 'checked':new_checked});
        console.log(new_checked)
      };
    





    render() {

        return (
                <div className="login">
                {'my_trades' in this.state && 
                    <Card className="tradeBox-card">
                    <Grid container className="tradeBox-grid-container"
                alignItems="center"
                justify="center" spacing={2} >
                        <Grid item xs={5} sm={5} md={5} lg={5} className="left-hand-tradeBox">
                            <div className="left-hand-paper">
                                <h2 className="tradeBox-want-text">You want: </h2>
                                <Card elevation={3} className="tradeBox-card-container">
                                    <CardHeader title={this.state['trade_info']['player_name']} />
                                    <img className="tradeBox-wanted-img"
                                        src={this.state['trade_info']['img_paths'][0]}
                                    />
                                </Card>

                            </div>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} className="middle-icon">
                            <SwapHorizIcon style={{ fontSize: 40 }} />
                        </Grid>


                        <Grid item xs={5} sm={5} md={5} lg={5} className="right-hand-tradeBox">
                            <div className="right-hand-paper">
                                <h2>Your offering: </h2>
                                <Paper elevation={2} className="tradeBox-paper-container">
                                    <List>
                                        {this.state['my_trades'].map((trade,index) =>
                                            <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(trade['id'])}>

                                                <ListItemAvatar>
                                                            <Avatar variant={"rounded"}
                                                                alt={`Card Image`}
                                                                src={trade['img_paths'][0]}
                                                            />
                                                </ListItemAvatar>


                                                <ListItemText id={trade['id']} primary={trade['player_name']} />
                                            
                                                <ListItemIcon>
                                                    <Checkbox
                                                        checked={this.state['checked'].indexOf(trade['id']) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': index }}
                                                    />
                                                </ListItemIcon>
                                            </ListItem>
                                        )}
                                    </List>
                                </Paper>
                                <Button disabled={this.state.checked.length <= 0} onClick={this.state.offerTrade.bind(null,this.state['checked'])} 
                                    size="large" variant="contained" className={!(this.state.checked.length <= 0) ? "tradeBox-button" : "tradeBox-button-disabled"}>Submit</Button>

                            </div>
                        </Grid>


                    </Grid>
                        
                    </Card>
                }
            </div>
                

        );

    }

}
export default TradeBox;