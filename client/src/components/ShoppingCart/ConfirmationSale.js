import React, { Component } from 'react';
import { FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel';
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


        if('ordered_items' in this.state) {
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
                                    <div style={{'width': '100%', height: '1rem'}}>
                                        <Typography className="order-number-text mont-text" variant="h6">
                                            Order #: {this.state['id']} ({this.state['order_info']['time'].split(" ")[0]})
                                        </Typography>
                                    </div>
                                    <Divider className="order-number-divider" />



                                <Typography className="to-be-traded-text mont-text" variant="h6">
                                        You have purchased:
                                </Typography>
                                <List className="cards-offered-confirm">
                                    { this.state['ordered_items'].map((card,index) =>
                                        <ListItem role={undefined} dense className="cards-offered-container">
                                            <ListItemAvatar>
                                                <ImageAvatar image={card['img_paths'][0]} />
                                            </ListItemAvatar>
                                            <ListText
                                                primary={card['year']+ " " + card['manufacturer'] + " " + card['cardSeries'] + " " + card['player_name']}
                                                secondary={card['username']} />
                             
                                        </ListItem>
                                    )
                                    }
                                </List>
                                <Divider className="order-number-divider" />
                                <div>
                                <div style={{'width': '100%', height: '3rem'}}>
                                    <Typography className="to-be-traded-text mont-text" variant="h6">
                                            Shipping Info:
                                    </Typography>
                                </div>
                                <div className="insurance-shipping-info" style={{'width': '100%', height: 'max-content', textAlign: 'left'}}>
                                    { this.state['order_info']['card_insurance'] && 
                                      <Typography className="mont-text" variant="body1">
                                            Insurance Shipping Info:
                                        </Typography> 
                                        // && this.state['order_info']['shipping_info']
                                      
                                    }
                                </div>
                                </div>
                             

                            </Box>
                    
                        </Paper>
                    </div>
                </Grid>
            </Grid>
                    
                    
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




