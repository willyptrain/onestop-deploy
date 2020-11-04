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
import Tooltip from '@material-ui/core/Tooltip';



// const stripePromise = loadStripe('pk_test_51HEh1wIbuCLDMAXJBSr5hbsCncH2AY8IBRe4X4MYheULkUbFbGYEFy9tYsahfPAFHSyFBa8rn3smim0JGo6rMgrI00kvafsZCc');



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

    return (<div className="cart-item-text">
        <ListItemText className="" primaryTypographyProps={{variant: 'h5', className:"mont-text"}}
        secondaryTypographyProps={{variant: 'h6', className:"mont-text"}} primary={data.primary} secondary={data.secondary} />
    </div>)

}


class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        console.log(props); 
        this.state = {'open': false, shipping_info: {}};
        this.insuranceHelper = "Insurance brief"
    }

    // 'username' 'id' 'sport' 'player_name' 'year' 'manufacturer' 'cardNumber'
    //  'cardSeries' 'comments' 'tradeOrSell' 'price'  'time'

    async componentDidMount() {
        let cart = JSON.parse(localStorage.cart);
        console.log(cart);
        var total = 0;
        var checked_keys = {}
        Object.keys(cart).map((key) =>  {
            console.log(key)
            if(cart.hasOwnProperty(key)) {
                total += cart[key].price;
                // checked_keys[key] = false;
            }
        })
        this.setState({...this.state, 'cart':cart, 'insurance':true,'subtotal':total})

    }



 
    checkout_sale = (event) => {
    //     let token = localStorage.access_token;
    //     let array_cart = []

    //     Object.keys(this.state['cart']).map((key) =>  {
    //         if(this.state['cart'].hasOwnProperty(key)) {
    //             array_cart.push(this.state['cart'][key])
    //         }
    //     })

    //     axios.post(`/api/sale_order/checkout/${token}`, {
    //         'cart': array_cart,
    //         'insurance':this.state['insurance'],
    //         'subtotal':this.state['subtotal']
    //     })
        // localStorage.setItem('insurance',JSON.stringify(this.state['insurance']));
        // localStorage.setItem('cart',JSON.stringify(this.state['cart']));
        // localStorage.setItem('subtotal',JSON.stringify(this.state['subtotal']));
    
        this.setState({...this.state, 'open':true})



    }






    checkBox = (event) => {
        
        let new_checked = this.state['insurance']
       
        this.setState({...this.state, 'insurance':!new_checked})
    
    
    
    }


    removeFromCart = (event) => {
        let id = event.currentTarget.id;
        let cart = this.state['cart'];
        if(cart[id]) {
            delete cart[id]
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        var total = 0;
        // var checked_keys = {}
        Object.keys(cart).map((key) =>  {
            console.log(key)
            if(cart.hasOwnProperty(key)) {
                total += cart[key].price;
                // checked_keys[key] = false;
            }
        })
        this.setState({...this.state, 'cart':cart,'subtotal':total})
        
    }

    open = () => {
        this.setState({'open': true})
    }
    handleClose = () => {
        this.setState({'open': false})
      };
    
    placeOrder = (params) => {
        let token = localStorage.access_token
        console.log(params)
        axios.post(`/api/create_sale_order/stripe/${token}`, params)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, 'redirectUrl':`/confirmation/sale/${res.data['id']}`});
            localStorage.setItem('cart', JSON.stringify({}))
        })
        .catch(err =>  {
            console.log("error")
            console.log(err)

        })

    }






    render() {

        if('redirectUrl' in this.state && this.state['redirectUrl']) {
            return (<Redirect {...this.state} url={this.state['redirectUrl']} />);
        }


        if('cart' in this.state) {
                return (<div className="home-container">
                    

                    <Modal
                open={this.state['open']}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                    
                    <Grid container className="grid-container"
                  alignItems="center" style={{height: '0vh'}}
                  justify="center" spacing={3}>
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                            {/* <StripeCheckout /> */}
                            <Checkout placeOrder={this.placeOrder} {...this.state} userInfo={this.state['userInfo']} /> 
                        </Grid>
                    </Grid>
              </Modal>














                    <Typography className="shopping-cart-header mont-text" variant="h4">Shopping Cart</Typography>


                    <div className="list-header">
                        <Typography className="item-cart-text mont-text" color="textSecondary" variant="body1">Item</Typography>
                        {/* <Typography className="insurance-cart-text mont-text" color="textSecondary" variant="body1">Insurance</Typography> */}
                        <Typography className="price-cart-text mont-text" color="textSecondary" variant="body1">Price</Typography>

                    </div>
                    <Divider className="cart-divider" />

                    <List className="shopping-cart-list">

                    
                    {
                        Object.keys(this.state['cart']).map((key) => 
                       <div style={{display: 'flex', width: '100%'}}>
                            <div className="list-item">
                                <ListItem role={undefined} dense className="cart-item">
                                    <div className="item-left">
                                        <ListItemAvatar>
                                                    {/* <Avatar className="wanted-card-confirm-img" variant={"rounded"}
                                                        alt={`Card Image`}
                                                        src={this.state['posted_card']['img_paths'][0]}
                                                    /> */}
                                                    <ImageAvatar image={this.state['cart'][key]['img_paths'][0]} />
                                        </ListItemAvatar>
                                        


                                        <ListText
                                        primary={this.state['cart'][key]['year']+ " " +this.state['cart'][key]['manufacturer'] + " " + this.state['cart'][key]['cardSeries'] + " " + this.state['cart'][key]['player_name']}
                                        secondary={this.state['cart'][key]['username']} />

                                    </div>
                                    <div className="checkbox-container">
                                {/* <ListItemIcon className="icon-check-insurance">
                                    <Checkbox
                                        checked={this.state['checked'][key]}
                                        id={key}
                                        onClick={this.checkBox}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': key }}
                                    />
                                </ListItemIcon> */}
                                </div>
                                <div className="price-container-cart">
                                <Typography className="price-tag" variant='h5'>${this.state['cart'][key]['price']}</Typography>

                                <IconButton id={key} onClick={this.removeFromCart} className="delete-btn" style={{height: 'min-content'}}>
                                    <ClearIcon size="large" style={{color: 'black', fontWeight: '800'}} />
                                </IconButton>
                                </div>
                                    </ListItem>
                            </div>
                    
                    </div>

                        )
                    }


                  </List>
                  <Divider className="cart-divider" />

                <div className="price-box">
                    <div className="insurance-box">
                        <Tooltip title={this.insuranceHelper}>
                        <Typography variant="body1" className="mont-text">Insurance: </Typography> 
                        </Tooltip>
                        <Checkbox className="checkbox"
                            checked={this.state['insurance']}
                            onClick={this.checkBox}
                            tabIndex={-1}
                            disableRipple
                        />
                    </div>
                    <Typography color="textSecondary" className="subtotal mont-text" variant='h6'><b>Subtotal: </b>${this.state['subtotal']}</Typography>
                    <Typography color="textSecondary" className="service-fee mont-text" variant='h6'><b>Service Fee: </b>$TBD</Typography>
                <Divider className="price-divider" />
                <Typography className="total-price mont-text" variant='h5'><b>Total: </b>$TBD</Typography>
                
                <Button onClick={this.checkout_sale} disabled={Object.keys(this.state['cart']).length == 0} size="large" variant="contained" className="checkout-btn mont-text">
                    Proceed to Checkout {Object.keys(this.state['cart']).length == 0}
                </Button>
                
                </div>


                    
                    
                    </div>);
            }
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }



        
       
    }

}
export default ShoppingCart;

