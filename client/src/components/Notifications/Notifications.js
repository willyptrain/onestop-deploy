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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import './notifications.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



export function TradeNotifications(data) {


    console.log(data)

    // const changeTab = (event) => {

    // }

    return (<div>
                            
                        
                        {/* <TextField required form="listing-form" class="standard-select-currency-native" value={data.pendingOrCompleted} 
                    select onChange={changeTab} 
                        style={{ minWidth: 150, textAlign: 'left' }} variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                            <MenuItem key={"pending"} value="pending">
                                Pending
                            </MenuItem>
                            <MenuItem key={"completed"} value="completed">
                                Completed
                            </MenuItem>

                    </TextField> */}

                    {data.trades && 
                     
                        <div className="margin-adjust">
                        <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Trades</Typography>
                            <Grid container className="past-order-grid-container"
                                alignItems="left"
                                justify="left" spacing={0} >

                                    {data.trades.map((offer,index) => 
                                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                         <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                                 
                                                <CardMedia
                                                    className="offer-img"
                                                    image={offer.img_paths.length > 0 ? offer.original_trade['img_paths'][0] : ""}
                                                    title="Paella dish"
                                                />


                                                <CardContent>
                                                    <Typography variant="h6" className="mont-text">
                                                        {offer.year+ " " + offer.manufacturer + " " + offer.cardSeries + " " + offer.player_name}
                                                    </Typography>
                                                </CardContent>
                                                {/* <CardActions> */}
                                                <Typography align="right" style={{color: !offer.for_trade ? 'green' : 'black'}} className="order-status mont-text ">
                                                    <b>{offer.for_trade ? "For Trade" : "Trade Accepted"}</b>
                                                </Typography>
                                                {/* </CardActions> */}


                                 
                                            </Card>
                                         </div>
  
                                    </Grid>
                                )}
                            </Grid>
                    </div>
                    </div>
                        
                    
                    
                    }
                    
    </div>)

}




export function SaleNotifications(data) {

    const changeTab = (event) => {
        
    }

    return (<div>
                            
                        
        {/* <TextField required form="listing-form" class="standard-select-currency-native" value={data.pendingOrCompleted} 
    select onChange={changeTab} 
        style={{ minWidth: 150, textAlign: 'left' }} variant="filled" InputLabelProps={{
            shrink: true,
        }}>
            <MenuItem key={"pending"} value="pending">
                Pending
            </MenuItem>
            <MenuItem key={"completed"} value="completed">
                Completed
            </MenuItem>

    </TextField> */}

    {data.sales && 
     
        <div className="margin-adjust">
        <div className="trade-out-notif-container">
        <Typography className="notif-header" variant="h4">Sales</Typography>
            <Grid container className="past-order-grid-container"
                alignItems="left"
                justify="left" spacing={0} >

                    {data.sales.map((offer,index) => 
                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                         <div style={{width: '94%', marginLeft: '2rem'}}>
                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                 
                                <CardMedia
                                    className="offer-img"
                                    image={offer.img_paths.length > 0 ? offer.original_trade['img_paths'][0] : ""}
                                    title="Paella dish"
                                />


                                <CardContent>
                                    <Typography variant="h6" className="mont-text">
                                        {offer.year+ " " + offer.manufacturer + " " + offer.cardSeries + " " + offer.player_name}
                                    </Typography>
                                </CardContent>
                                {/* <CardActions> */}
                                <Typography align="right" style={{color: !offer.for_sale ? 'green' : 'black'}} className="order-status mont-text ">
                                    <b>{offer.for_sale ? "For Sale" : "Sold"}</b>
                                </Typography>
                                {/* </CardActions> */}


                 
                            </Card>
                         </div>

                    </Grid>
                )}
            </Grid>
    </div>
    </div>
        
    
    
    }
    
</div>)

}


export function OfferNotifications(data) {


    const changeTab = (event) => {
        
    }

    return (<div>
                            
                        
                        <TextField required form="listing-form" class="standard-select-currency-native" value={data.pendingOrCompleted} 
                    select onChange={changeTab} 
                        style={{ minWidth: 150, textAlign: 'left' }} variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                            <MenuItem key={"pending"} value="pending">
                                Pending
                            </MenuItem>
                            <MenuItem key={"completed"} value="completed">
                                Completed
                            </MenuItem>

                    </TextField>
                    
    </div>)

}





















class Notifications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {'tab':'trades'};
    }

    async componentDidMount() {
        let token = localStorage.access_token;
        console.log(token);
        axios.get(`/api/users/${token}`)
        .then(res => {
            console.log(res.data)
            this.setState({...this.state, 
                ...res.data})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })

    }
    
    acceptOffer = (event) => {
        let token = localStorage.access_token;
        axios.get(`/api/accept_trade_offer/${event.currentTarget.value}/${token}`)
        .then(res => {
            // console.log(res.data)
            this.setState({...this.state, 
                'redirectUrl':`/confirmation/${res.data.id}`
            })
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })


    }

        
    denyOffer = (event) => {
        let token = localStorage.access_token;
        axios.get(`/api/deny_trade_offer/${event.currentTarget.value}/${token}`)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, ...res.data})
        })
        .catch(err =>  {
            console.log(err);
            this.setState({...this.state, 'error': err})

        })


    }


    handleChange = (event, new_val) => {
        this.setState({...this.state, 'tab':new_val})
    }



    render() {
        if('redirectUrl' in this.state && this.state['redirectUrl']) {
            return <Redirect {...this.state} url={this.state['redirectUrl']} />
        }
        if('pending_trades_out' in this.state) {
                // if(this.state['tab'] == 'trades') {
                    return (<div className="home-container">
                    

                    <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Your Offers</Typography>
                            <Grid container className="notif-grid-container"
                                alignItems="center"
                                justify="center" spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                    
                                        
                                        <Paper className="trade-in-notif-paper">
                                        <List className="notif-list">
                                    {this.state['pending_trades_out'].map((offer,index) => 
                                        <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <ListItem key={`notif-trade-${index}`} dense>
                                            
                                            <Typography className="list-item-text">
                                                You offered <b>{offer.offered_cards.map(x => <a href={`/for_trade/item/${x.id}`}>{x.player_name}</a> )} </b>
                                                    to <b>{offer.original_trade.username} </b> for <b><a href={`/for_trade/item/${offer.original_trade.id}`}>{offer.original_trade.player_name}</a></b>
                                            </Typography>

                                            <Typography className="list-item-status mont-text">
                                                {/* Status: <a href={`/confirmation/${offer.id}`}>{offer.status}</a> */}
                                                Status: {offer.status}
                                            </Typography>

                                            
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    )}
                                    

                                    
                                    {this.state['accepted_trades_out'].map((offer,index) => 
                                        <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <ListItem key={`notif-trade-${index}`} dense>
                                            
                                            <Typography style={{display: 'inline-block'}} className="list-item-text">
                                                You offered <b>{offer.offered_cards.map(x => <><a href={`/for_trade/item/${x.id}`}>{x.player_name}</a><b>, </b></>  )} </b>
                                                    to <b>{offer.original_trade.username} </b> for <b>{offer.original_trade.player_name}</b>
                                            </Typography>

                                            <Typography className="list-item-status mont-text">
                                                Status: <b>{offer.status}</b>
                                            </Typography>

                                            
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    )}
                                        
        
                                   











                                    
                                        </List>
                                    </Paper>
                                </Grid>
                            </Grid>
                    </div>

                    <div className="trade-in-notif-container">
                        <Typography className="notif-header" variant="h4">Your Trade Listings</Typography>
                        <Grid container className="notif-grid-container"
                    alignItems="center"
                    justify="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                
                                <Paper className="trade-in-notif-paper">
                                    <List className="notif-list">
                                {this.state['pending_trades_in'].map((offer,index) => 
                                    <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <ListItem key={`notif-trade-${index}`} dense>
                                        
                                        <Typography className="list-item-text mont-text">
                                        {offer.offered_cards[0].username} offered <b>{offer.offered_cards.map(x => x.player_name).join(", ")} </b>
                                                for your <b>{offer.original_trade.player_name}</b>
                                        </Typography>
                                        
                                        <Button variant="contained" onClick={this.acceptOffer} value={offer.id} className="accept-button" color="primary">Accept</Button>
                                        <Button variant="contained" onClick={this.denyOffer} value={offer.id} className="deny-button" color="secondary">Decline</Button>    
                                                
                                        


                                        </ListItem>
                                        <Divider />
                                    </div>
                                )}

                            {this.state['accepted_trades_in'].map((offer,index) => 
                                    <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <ListItem key={`notif-trade-${index}`} dense>
                                        
                                        <Typography className="list-item-text mont-text">
                                        You approved {offer.offered_cards[0].username}'s offer 
                                                for your <b>{offer.original_trade.player_name}</b>
                                        </Typography>
                                        

                                        <Typography className="list-item-status mont-text">
                                                Status: <b style={{color: 'green'}}>Accepted</b>
                                        </Typography>  
                                        


                                        </ListItem>
                                        <Divider />
                                    </div>
                                )}
  



                              
                                
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div> 













                    {/* <div>
                        <Tabs centered
                            value={this.state['tab']}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab value="trades" className="tabs-notif" label="Trades" />
                            <Tab value="sales" className="tabs-notif" label="Sales" />
                            <Tab value="offers" className="tabs-notif" label="Offers" />
                        </Tabs>

                    </div>
                    {this.state['tab'] == "trades" && 
                        <TradeNotifications trades={this.state['trades']} pendingOrCompleted={"pending"} />
                    }
                    {this.state['tab'] == "sales" && 
                        <SaleNotifications sales={this.state['sales']} pendingOrSold={"pending"}  />
                    }
                    {this.state['tab'] == "offers" && 
                        <OfferNotifications {...this.state} pendingOrCompleted={"pending"}  />
                    } */}


                    
                </div>);
                    
        }

                
         else {
             return (<div className="home-container">
                 <CircularProgress />
             </div>)
         } 


       
    }

}
export default Notifications;

    {/* <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Your Offers</Typography>
                            <Grid container className="notif-grid-container"
                                alignItems="center"
                                justify="center" spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                    {this.state['pending_trades_out'].length > 0 &&
                                        
                                        <Paper className="trade-in-notif-paper">
                                        <List className="notif-list">
                                    {this.state['pending_trades_out'].map((offer,index) => 
                                        <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <ListItem key={`notif-trade-${index}`} dense>
                                            
                                            <Typography className="list-item-text">
                                                You offered <b>{offer.offered_cards.map(x => <a href={`/for_trade/item/${x.id}`}>{x.player_name}</a> )} </b>
                                                    to <b>{offer.original_trade.username} </b> for <b><a href={`/for_trade/item/${offer.original_trade.id}`}>offer.original_trade.player_name</a></b>
                                            </Typography>

                                            <Typography className="list-item-status mont-text">
                                                Status: <a href={`/confirmation/${offer.id}`}>{offer.status}</a>
                                            </Typography>

                                            
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    )}

                                    
                                    {this.state['accepted_trades_out'].map((offer,index) => 
                                        <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <ListItem key={`notif-trade-${index}`} dense>
                                            
                                            <Typography className="list-item-text">
                                                You offered <b>{offer.offered_cards.map(x => <a href={`/for_trade/item/${x.id}`}>{x.player_name}</a> )} </b>
                                                    to <b>{offer.original_trade.username} </b> for <b>{offer.original_trade.player_name}</b>
                                            </Typography>

                                            <Typography className="list-item-status mont-text">
                                                Status: <b>{offer.status}</b>
                                            </Typography>

                                            
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    )}
                                        
        
                                   











                                    
                                        </List>
                                    </Paper>}
                                </Grid>
                            </Grid>
                    </div>

                    <div className="trade-in-notif-container">
                        <Typography className="notif-header" variant="h4">Your Trade Listings</Typography>
                        <Grid container className="notif-grid-container"
                    alignItems="center"
                    justify="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} className="notif-grid">
                                {this.state['pending_trades_in'].length > 0 &&
                                <Paper className="trade-in-notif-paper">
                                    <List className="notif-list">
                                {this.state['pending_trades_in'].map((offer,index) => 
                                    <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <ListItem key={`notif-trade-${index}`} dense>
                                        
                                        <Typography className="list-item-text mont-text">
                                        {offer.offered_cards[0].username} offered <b>{offer.offered_cards.map(x => x.player_name).join(", ")} </b>
                                                for your <b>{offer.original_trade.player_name}</b>
                                        </Typography>
                                        
                                        <Button variant="contained" onClick={this.acceptOffer} value={offer.id} className="accept-button" color="primary">Accept</Button>
                                        <Button variant="contained" onClick={this.denyOffer} value={offer.id} className="deny-button" color="secondary">Decline</Button>    
                                                
                                        


                                        </ListItem>
                                        <Divider />
                                    </div>
                                )}

  



                                {!this.state['pending_trades_in'].length > 0 &&
                                    <h6>No Pending Listings at this time</h6>
                                }
                                
                                    </List>
                                </Paper>}
                            </Grid>
                        </Grid>
                    </div> */}




                {/* </div>) */}
             {/* } else if(this.state['tab'] == 'sales') {
            //     return (
            //         <div className="home-container">
            //             <div className="tabs-notif">
            //                 <Tabs centered
            //                     value={this.state['tab']}
            //                     indicatorColor="primary"
            //                     textColor="primary"
            //                     onChange={this.handleChange}
            //                     aria-label="disabled tabs example"
            //                 >
            //                     <Tab value="pending" className="tabs-notif" label="Posted Offers and Cards" />
            //                     <Tab value="past" className="tabs-notif" label="Accepted Trades and Sales" />
            //                 </Tabs>
            //             </div> */}



{/* 
                    <div className="margin-adjust">
                        <div className="trade-out-notif-container">
                        <Typography className="notif-header" variant="h4">Trades</Typography>
                            <Grid container className="past-order-grid-container"
                                alignItems="left"
                                justify="left" spacing={0} >

                                    {this.state['accepted_trades_out'].map((offer,index) => 
                                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                         <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                               {offer.img_paths.length > 0 && 
                                                <CardMedia
                                                    className="offer-img"
                                                    image={offer.original_trade['img_paths'][0]}
                                                    title="Paella dish"
                                                />}


                                                <CardContent>
                                                    <Typography variant="h6" className="mont-text">
                                                        {offer.original_trade['year']+ " " + offer.original_trade['manufacturer'] + " " + offer.original_trade['cardSeries'] + " " + offer.original_trade['player_name']}
                                                    </Typography>
                                                </CardContent>


                                 
                                            </Card>
                                         </div>
  
                                    </Grid>
                                )}
                            </Grid>
                    </div>

                    <div className="trade-in-notif-container">
                        <Typography className="notif-header" variant="h4">Sales</Typography>
                        <Grid container className="notif-grid-container"
                    alignItems="center"
                    justify="center" spacing={2} > */}
                            {/* {this.state['accepted_trades_out'].map((offer,index) => 
                                    <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                         <div style={{width: '94%', marginLeft: '2rem'}}>
                                            <Card className="order-card" key={`notif-trade-card-${index}`}>
                                                <CardMedia
                                                    className="offer-img"
                                                    image={offer.original_trade['img_paths'][0]}
                                                    title="Paella dish"
                                                />


                                                <CardContent>
                                                    <Typography variant="h6" className="mont-text">
                                                        {offer.original_trade['year']+ " " + offer.original_trade['manufacturer'] + " " + offer.original_trade['cardSeries'] + " " + offer.original_trade['player_name']}
                                                    </Typography>
                                                </CardContent>


                                 
                                            </Card>
                                         </div>
  
                                    </Grid>
                                )} */}
                        {/* </Grid>
                    </div>
 */}

                    {/* </div> */}













                    {/* </div> */}


                {/* );
            } */}

        
        {/* else if(this.state['tab'] == 'pending') {
            return (
                <div className="home-container">
                    <div className="tabs-notif">
                        <Tabs centered
                            value={this.state['tab']}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab value="pending" className="tabs-notif" label="Posted Offers and Cards" />
                            <Tab value="past" className="tabs-notif" label="Accepted Trades and Sales" />
                        </Tabs>
                    </div>




                <div className="margin-adjust">
                    <div className="trade-out-notif-container">
                    <Typography className="notif-header" variant="h4">Trades</Typography>
                        <Grid container className="past-order-grid-container"
                            alignItems="left"
                            justify="left" spacing={0} >

                                {this.state['accepted_trades_out'].map((offer,index) => 
                                <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                     <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <Card className="order-card" key={`notif-trade-card-${index}`}>
                                            <CardMedia
                                                className="offer-img"
                                                image={offer.original_trade['img_paths'][0]}
                                                title="Paella dish"
                                            />


                                            <CardContent>
                                                <Typography variant="h6" className="mont-text">
                                                    {offer.original_trade['year']+ " " + offer.original_trade['manufacturer'] + " " + offer.original_trade['cardSeries'] + " " + offer.original_trade['player_name']}
                                                </Typography>
                                            </CardContent>


                             
                                        </Card>
                                     </div>

                                </Grid>
                            )}
                        </Grid>
                </div>

                <div className="trade-in-notif-container">
                    <Typography className="notif-header" variant="h4">Sales</Typography>
                    <Grid container className="notif-grid-container"
                alignItems="center"
                justify="center" spacing={2} >
                        {/* {this.state['accepted_trades_out'].map((offer,index) => 
                                <Grid item xs={11} sm={4} md={4} lg={4} className="notif-grid">
                                     <div style={{width: '94%', marginLeft: '2rem'}}>
                                        <Card className="order-card" key={`notif-trade-card-${index}`}>
                                            <CardMedia
                                                className="offer-img"
                                                image={offer.original_trade['img_paths'][0]}
                                                title="Paella dish"
                                            />


                                            <CardContent>
                                                <Typography variant="h6" className="mont-text">
                                                    {offer.original_trade['year']+ " " + offer.original_trade['manufacturer'] + " " + offer.original_trade['cardSeries'] + " " + offer.original_trade['player_name']}
                                                </Typography>
                                            </CardContent>


                             
                                        </Card>
                                     </div>

                                </Grid>
                            )} */}
                    {/* </Grid>
                </div>


                </div>













                </div>


            );
        }
    } */} 

    