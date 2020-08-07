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
import Divider from '@material-ui/core/Divider';
import './notifications.css';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      borderRadius: '2% !important',
      border: '2px solid black'
    },
  }));



  const useTextStyles = makeStyles((theme) => ({
    
  }));




export function ImageAvatar(data) {
    const classes = useStyles();

    return (<div>
        <Avatar variant="square" src={data.image} className={classes.large} />

    </div>)

}


export function ListText(data) {
    const classes = useTextStyles();

    return (<div className="wanted-card-confirm-name">
        <ListItemText className="" primaryTypographyProps={{variant: 'h5', className:"mont-text"}}
        secondaryTypographyProps={{variant: 'h6', className:"mont-text"}} primary={data.primary} secondary={data.secondary} />
    </div>)

}

// {this.state['posted_card']['year']+ " " + this.state['posted_card']['manufacturer'] + " " + this.state['posted_card']['cardSeries'] + " " + this.state['posted_card']['player_name']}
//this.state['card_poster']['username']

class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {'order_id':props.order_id};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/get_trade_order/${this.state['order_id']}/${token}`)
        .then(res => {
            console.log(res.data)
            this.setState({...this.state, ...res.data});

        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })

    }







    render() {
        if('card_insurance' in this.state) {
            return (<div className="home-container">
                
                <Grid container spacing={3} alignItems="center"
            justify="center" >
                <Grid item xs={12} sm={12} md={12} lg={12} className="confirmation-grid">
                    <div>
                        <Paper className="confirmation-paper">
                            <Box mx="auto">
                                        <CloudDoneIcon style={{fontSize: 80}} className="cloud-icon" />
                                    <Typography className="order-success-confirm-text mont-text" variant="h3">
                                        Order Successful!
                                    </Typography>
                                    <Typography className="order-number-text mont-text" variant="h6">
                                        Order Number: {this.state['id']}
                                    </Typography>
                                    <Divider className="order-number-divider" />
                                    {/* <div className="wanted-card-confirm"> */}
                                    


                                <List className="wanted-card-confirm">
                                    <ListItem role={undefined} dense className="wanted-container">

                                                <ListItemAvatar>
                                                            {/* <Avatar className="wanted-card-confirm-img" variant={"rounded"}
                                                                alt={`Card Image`}
                                                                src={this.state['posted_card']['img_paths'][0]}
                                                            /> */}
                                                            <ImageAvatar image={this.state['posted_card']['img_paths'][0]} />
                                                </ListItemAvatar>
                                                
                                    


                                                <ListText
                                                primary={this.state['posted_card']['year']+ " " + this.state['posted_card']['manufacturer'] + " " + this.state['posted_card']['cardSeries'] + " " + this.state['posted_card']['player_name']}
                                                secondary={this.state['card_poster']['username']} />
 
                                            </ListItem>
                                </List>
                                <Divider className="generic-divider" />


                                <Typography className="to-be-traded-text mont-text" variant="h6">
                                        To be traded with...
                                    </Typography>
                                <List className="cards-offered-confirm">
                                    { this.state['offered_cards'].map((card,index) =>
                                        <ListItem role={undefined} dense className="cards-offered-container">
                                            <ListItemAvatar>
                                                <ImageAvatar image={card['img_paths'][0]} />
                                            </ListItemAvatar>
                                            <ListText
                                                primary={card['year']+ " " + card['manufacturer'] + " " + card['cardSeries'] + " " + card['player_name']}
                                                secondary={this.state['card_offerer']['username']} />
                             
                                        </ListItem>
                                    
                                    
                                    
                                    
                                    )
                                    }
                                </List>

                            </Box>
                    
                        </Paper>
                    </div>
                </Grid>
            </Grid>





{/* <Box display="flex" alignItems="flex-start" className="wanted-card-confirm"> */}
                                        {/* <Box className="confirm-order-box" component="div" display="inline"> */}
                                            {/* <p>Hello</p> */}
                                            {/* <img alt="Card Image" className="wanted-card-confirm-img" src={this.state['posted_card']['img_paths'][0]} /> */}
                                        {/* </Box> */}
                                        {/* <Box component="div" display="inline"> */}
                                            {/* <Typography className="wanted-card-confirm-name mont-text" variant="h6">
                                                {this.state['posted_card']['year']+ " " + this.state['posted_card']['manufacturer'] + " " + this.state['posted_card']['cardSeries'] + " " + this.state['posted_card']['player_name']}
                                            </Typography>
                                        </Box> */}
                                    {/* </div> */}










            </div>)

        } 
        
        
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }
       
    }

}
export default Notifications;

