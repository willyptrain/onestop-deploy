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
import Card from '@material-ui/core/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';




export function ShippingTab(data) {

    const countryList = ["United States"]
    const stateList = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    const [state, setState] = React.useState('shipping_info' in data ? data.shipping_info : {})



    const updateShipping = (event, field) => {
        setState({...state, [field]:event.target.value})
        data.updateShipping({shipping_info: state})
    
    }


    return (<div className={data.className ? data.className : "tab-item-container"}>

        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Name</Typography>
            <TextField  required form="listing-form"
                    id="standard-basic"
                    placeholder="John Doe" 
                    margin="normal"
                    variant="filled"
                    value={state['name']}
                    className="fullwidth-field-item"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => updateShipping(e, "name")}
            />
        </div>
        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Email</Typography>
            <TextField  required form="listing-form"
                            id="standard-adornment-amount"
                            placeholder="email@website.com" 
                            margin="normal"
                            variant="filled"
                            value={state['email']}
                            className="fullwidth-field-item"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => updateShipping(e, "email")}
                />
        </div>
        <div className="fullwidth-field-container">
        <Typography variant="body1" className="mont-text">Phone</Typography>
            <TextField  required form="listing-form"
                            id="standard-adornment-amount"
                            placeholder="XXX-XXX-XXXX" 
                            margin="normal"
                            variant="filled"
                            value={state['phone']}
                            className="phone-field-checkout"
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            
                            onChange={e => updateShipping(e, "phone")}
                />
        </div>
        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Country</Typography>
            <TextField required form="listing-form" class="standard-select-currency-native country-select" value={state['country']} 
            select placeholder="Placeholder" onChange={e => updateShipping(e, "country")} 
                style={{textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                    shrink: true,
                }}>
                {countryList.map((country) => 
                    <MenuItem key={country} value={country}>
                        {country}
                    </MenuItem>
                )}

            </TextField>
        </div>
        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Address</Typography>
            <TextField  required form="listing-form"
                            id="standard-adornment-amount"
                            placeholder="123 Road Ln" 
                            margin="normal"
                            variant="filled"
                            value={state['address']}
                            className="address-field-checkout"
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            
                            onChange={e => updateShipping(e, "address")}
                />
        </div>
        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">City, State</Typography>
            <div className="city-state-container">
                <TextField  required form="listing-form"
                                id="standard-adornment-amount"
                                placeholder="New York City" 
                                margin="normal"
                                variant="filled"
                                value={state['city']}
                                className="city-field-checkout"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                
                                onChange={e => updateShipping(e, "city")}
                    />
                    <TextField required form="listing-form" class="state-select" value={state['state']} 
                select placeholder="Placeholder" onChange={e => updateShipping(e, "state")} 
                    style={{textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                        shrink: true,
                    }}>
                    {stateList.map((item) => 
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    )}

                </TextField>
            </div>
        </div>
        <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Zip Code</Typography>
            <TextField  required form="listing-form"
                            id="standard-adornment-amount"
                            placeholder="12345" 
                            margin="normal"
                            variant="filled"
                            value={state['zip']}
                            className="zip-field-checkout"
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            
                            onChange={e => updateShipping(e, "zip")}
                />
        </div>
        


    </div>)
    


}


const PaymentTab = (data) => {
    

    console.log(data);



    const [needAddress, setNeedAddress] = React.useState(false)
    const countryList = ["United States"]
    const stateList = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    
    
    const [billingName, setBillingName] = React.useState(data.shipping_info.name);
    const [billingEmail, setBillingEmail] = React.useState(data.shipping_info.email);
    const [billingPhone, setBillingPhone] = React.useState(data.shipping_info.phone);
    const [billingCity, setBillingCity] = React.useState(data.shipping_info.city);
    const [billingZip, setBillingZip] = React.useState(data.shipping_info.zip);
    const [billingAddress, setBillingAddress] = React.useState(data.shipping_info.address);
    const [billingCountry, setBillingCountry] = React.useState(data.shipping_info.country);
    const [billingState, setBillingState] = React.useState(data.shipping_info.state);


    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = React.useState(null);
    const [cardComplete, setCardComplete] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState(null);

    



    const handleSubmit = async (event) => {
        event.preventDefault();
    

        if (!stripe || !elements) {
          return;
        }
    
        if (error) {
          elements.getElement('card').focus();
          return;
        }
    
        if (cardComplete) {
          setProcessing(true);
        }


    
        const payload = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
          billing_details: {
              address:billingAddress,
              email: billingEmail,
              phone: billingPhone,
              name: billingName
          },
        });
  
        data.placeOrder({...data, ...payload})
    
        setProcessing(false);
    
        if (payload.error) {
          setError(payload.error);
        } else {
          setPaymentMethod(payload.paymentMethod);
        }
      };



























    
    return (
    <div>
        <div className="tab-item-container">
            <form className="Form" onSubmit={handleSubmit} className="fullwidth-field-container">
                <fieldset className="FormGroup">
                    <div className="FormRow">
                    <CardElement
                        onChange={(e) => {
                        setError(e.error);
                        setCardComplete(e.complete);
                        }}
                    />
                    </div>
                </fieldset>

            </form>

        <div className="fullwidth-field-container">
            <Checkbox
                    checked={!needAddress}
                    onClick={(event) => setNeedAddress(!needAddress)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby':'billing address' }}
            />
            Billing Address Same as Shipping?
        </div>
        
        {needAddress && <div className="address-dropdown">

            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">Name</Typography>
                <TextField  required form="listing-form"
                        id="standard-basic"
                        placeholder="John Doe" 
                        margin="normal"
                        variant="filled"
                        value={billingName}
                        className="fullwidth-field-item"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setBillingName(event.target.value)}
                />
            </div>
            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">Email</Typography>
                <TextField  required form="listing-form"
                                id="standard-adornment-amount"
                                placeholder="email@website.com" 
                                margin="normal"
                                variant="filled"
                                value={billingEmail}
                                className="fullwidth-field-item"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => setBillingEmail(event.target.value)}
                    />
            </div>
            <div className="fullwidth-field-container">
            <Typography variant="body1" className="mont-text">Phone</Typography>
                <TextField  required form="listing-form"
                                id="standard-adornment-amount"
                                placeholder="XXX-XXX-XXXX" 
                                margin="normal"
                                variant="filled"
                                value={billingPhone}
                                className="phone-field-checkout"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                
                                onChange={(event) => setBillingPhone(event.target.value)}
                    />
            </div>
            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">Country</Typography>
                <TextField required form="listing-form" class="standard-select-currency-native country-select" value={billingCountry} 
                select placeholder="Placeholder" onChange={(event) => setBillingCountry(event.target.value)} 
                    style={{textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                        shrink: true,
                    }}>
                    {countryList.map((country) => 
                        <MenuItem key={country} value={country}>
                            {country}
                        </MenuItem>
                    )}

                </TextField>
            </div>
            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">Address</Typography>
                <TextField  required form="listing-form"
                                id="standard-adornment-amount"
                                placeholder="123 Road Ln" 
                                margin="normal"
                                variant="filled"
                                value={billingAddress}
                                className="address-field-checkout"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                
                                onChange={(event) => setBillingAddress(event.target.value)}
                    />
            </div>
            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">City, State</Typography>
                <div className="city-state-container">
                    <TextField  required form="listing-form"
                                    id="standard-adornment-amount"
                                    placeholder="New York City" 
                                    margin="normal"
                                    variant="filled"
                                    value={billingCity}
                                    className="city-field-checkout"
                                    InputLabelProps={{
                                        shrink: true,
                                    }} 
                                    
                                    onChange={(event) => setBillingCity(event.target.value)}
                        />
                        <TextField required form="listing-form" class="state-select" value={billingState} 
                    select placeholder="Placeholder" onChange={(event) => setBillingState(event.target.value)} 
                        style={{textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                        {stateList.map((item) => 
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        )}

                    </TextField>
                </div>
            </div>
            <div className="fullwidth-field-container">
                <Typography variant="body1" className="mont-text">Zip Code</Typography>
                <TextField  required form="listing-form"
                                id="standard-adornment-amount"
                                placeholder="12345" 
                                margin="normal"
                                variant="filled"
                                value={billingZip}
                                className="zip-field-checkout"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                
                                onChange={(event) => setBillingZip(event.target.value)}
                    />
            </div>



            </div>
        }



        <div className="fullwidth-field-container">
            <Button onClick={handleSubmit} className="order-button">
                Place Order
            </Button>
        </div>

























        </div>



        
    </div>)

}




const stripePromise = loadStripe('pk_test_51HEh1wIbuCLDMAXJBSr5hbsCncH2AY8IBRe4X4MYheULkUbFbGYEFy9tYsahfPAFHSyFBa8rn3smim0JGo6rMgrI00kvafsZCc');


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {'step':0, 'placeOrder':props.placeOrder, 'shipping_info':props.shipping_info}
    }



    async componentDidMount() {
        let cart = JSON.parse(localStorage.cart);
        var total = 0;
        let array_cart = [];
        Object.keys(cart).map((key) =>  {
            if(cart.hasOwnProperty(key)) {
                total += cart[key].price;
                array_cart.push(cart[key]);
            }
        })
        this.setState({...this.state, 'cart':array_cart, 'insurance':true,'subtotal':total})

    }






    // handleChange = (event, new_val) => {
    //     this.setState({...this.state, '':new_val})
    // }

    handleNext = () => {
        this.setState({...this.state, 'step': this.state['step'] + 1});
    };
    
    handleBack = () => {
        this.setState({...this.state, 'step': this.state['step'] - 1});
    };

    updateShipping = (params) => {
        this.setState({...this.state, ...params})



    }



    getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return <ShippingTab updateShipping={this.updateShipping} {...this.state} />;
          case 1:
             console.log(this.state);
            return (<div>
                <Elements stripe={stripePromise}>
                    <PaymentTab placeOrder={this.state['placeOrder']} shipping_info={this.state['shipping_info']} {...this.state} />
                </Elements>
            </div>);
          
          default:
            return 'Unknown stepIndex';
        }
      }
    

    






    render() {

        // if('redirectUrl' in this.state && this.state['redirectUrl']) {
        //     return (<Redirect {...this.state} url={this.state['redirectUrl']} />);
        // }

        const steps = ["Shipping", "Payment"]
        const step = this.state['step'];



        if('cart' in this.state) {
                return (<div className="checkout-modal">
                        <Card className="checkout-card">
                            

                            <div className="checkout-form-container">



                                <Stepper activeStep={step} alternativeLabel>
                                        {steps.map(label => (
                                            <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                </Stepper>

                                



                                {this.getStepContent(step)}


                                <div className="stepper-footer">
                                <Button
                                    className={step === 0 ? "" : "generic-btn"}
                                    disabled={step === 0}
                                    onClick={this.handleBack}
                                    >
                                    Back
                                </Button>
                                <Button
                                        className={step === 1 ? "" : "generic-btn"}
                                        disabled={step === 1}
                                        onClick={this.handleNext}
                                        >
                                        Next
                                </Button>
                            </div>




                            </div>
                            <div className="item-view-container">

                            </div>




                        
                        </Card>
                    </div>);
            }
        else {
            return (<div className="home-container">
                <CircularProgress />
            </div>)
        }



        
       
    }

}
export default Checkout;

