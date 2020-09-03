import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './all_listings.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class MyListings extends Component {

    constructor(props) {
        super(props);
        this.state = {"tab": "trades"};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/my_listings/trades/${token}`)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, 'trades':res.data.trades})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }


    handleChange = (event, new_val) => {
        let token = localStorage.access_token;
        if(new_val == "trades") {
            axios.get(`/api/my_listings/trades/${token}`)
            .then(res => {
                console.log(res.data.trades)
                this.setState({...this.state, 'tab':"trades" ,'trades':res.data.trades})
            })
            .catch(err =>  {
                this.setState({...this.state, 'error': err})
            })
        } else {    
            axios.get(`/api/my_listings/sales/${token}`)
            .then(res => {
                console.log(res.data.sales)
                this.setState({...this.state, 'tab':"sales" ,'sales':res.data.sales})
            })
            .catch(err =>  {
                this.setState({...this.state, 'error': err})
            })
        }
    }


    editTrade = (event) => {
        console.log(event.currentTarget.id)
        console.log(event.target.id)
        window.location = `/view_listing/trades/${event.currentTarget.id}`
    }
    editSale = (event) => {
        console.log(event.target.id)
        console.log(event.currentTarget.id)
        window.location = `/view_listing/sales/${event.currentTarget.id}`
    }
    // editSale = (event) => {
    //     let token = localStorage.access_token;
    //     axios.get(`/api/my_listings/sales/${token}`)
    //     .then(res => {
    //         this.setState({...this.state, 'tab':"sales" ,'sales':res.data.trades})
    //     })
    //     .catch(err =>  {
    //         console.log("error :(")
    //         console.log(err);
    //     })
    // }


    render() {
        console.log(this.state);
        if('trades' in this.state && this.state['tab'] == "trades") {
            return (<div className="home-container">
                        <div style={{width: '100%'}}>
                                <Tabs centered
                                    value={this.state['tab']}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={this.handleChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab value="trades" label="trades" />
                                    <Tab value="sales" label="sales"  />
                                </Tabs>
                            </div>

                
                              <Grid container className="grid-container"
                  alignItems="left"
                  justify="left" spacing={0}>
                
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                        <Card className="track-card">
                                    
                        <CardActionArea onClick={() => window.location = `/view_listing/trades/${trade['id']}`}>
                                    <CardHeader 
                                        title={trade['player_name']}
                                        subheader={trade['username']}
                                    />
                                    <CardMedia className="track-img" image={trade['img_paths'][0]}></CardMedia>
                                    <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    {`Sport: ${trade['sport']} \n ${trade['comments']}`}
                                    </Typography>
                                    </CardContent>
                        </CardActionArea>
                                    <IconButton style={{float:'left'}} id={trade['id']} onClick={() => window.location = `/create_listing/edit/trade/${trade['id']}`} aria-label="add to favorites">
                                            <EditIcon />
                                    </IconButton>   
                                    <Typography align="right" style={{color: !trade.for_trade ? 'green' : 'black'}} className="mont-text ">
                                        <b>{trade.for_trade ? "For Trade" : "Traded"}</b>
                                    </Typography>
                        </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>
            </div>);
        }
        else if('sales' in this.state && this.state['tab'] == "sales") {
            return (<div className="home-container">

                            <div style={{width: '100%'}}>
                                <Tabs centered
                                    value={this.state['tab']}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={this.handleChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab value="trades" label="trades" />
                                    <Tab value="sales" label="sales"  />
                                </Tabs>
                            </div>


                              <Grid container className="grid-container"
                  alignItems="left"
                  justify="left" spacing={0}>
                
                {
                    this.state['sales'].map((sale, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                        <Card className="track-card">
                        <CardActionArea onClick={() => window.location = `/view_listing/trades/${sale['id']}`}>
                                    <CardHeader 
                                        title={sale['player_name']}
                                        subheader={sale['username']}
                                    />
                                    <CardMedia className="track-img" image={sale['img_paths'][0]}></CardMedia>
                                    <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    {`Sport: ${sale['sport']} \n ${sale['comments']}`}
                                    </Typography>
                                    </CardContent>
                        </CardActionArea>
                                    <IconButton style={{float:'left'}} id={sale['id']} onClick={() => window.location = `/create_listing/edit/sale/${sale['id']}`} aria-label="add to favorites">
                                            <EditIcon />
                                    </IconButton> 
                                    <Typography align="right" style={{color: !sale.for_sale ? 'green' : 'black'}} className="mont-text ">
                                        <b>{sale.for_sale ? "For Sale" : "Sold"}</b>
                                    </Typography>  
                        </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>
            </div>);
        }
        else {
            return (<div className="home-container">
                        <CircularProgress style={{position: 'absolute', top: '40vh'}} />

                

            </div>);
        }
       
    }

}
export default MyListings;

