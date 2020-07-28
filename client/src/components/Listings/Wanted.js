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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';



class Wanted extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport, "tab":"trades", "trades":[]};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        
        axios.get(`/api/wanted/trades/${this.state["sport"]}/${token}`)
        .then(res => {
            console.log(res.data.trades)
            this.setState({...this.state, "trades":res.data.trades})
        })
        .catch(err =>  {

        })

    }

    handleChange = (event, new_val) => {
        let token = localStorage.access_token;

        this.setState({...this.state, "tab":new_val});
        if(new_val == "trades") {
            axios.get(`/api/wanted/trades/${this.state["sport"]}/${token}`)
            .then(res => {
                console.log(res.data.trades)
                this.setState({...this.state, "trades":res.data.trades})
            })
            .catch(err =>  {

            })
        } else {    
            axios.get(`/api/wanted/sales/${this.state["sport"]}/${token}`)
            .then(res => {
                console.log(res.data.sales)
                this.setState({...this.state, "sales":res.data.sales})
            })
            .catch(err =>  {
        
            })
        }
    }


    render() {
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
                  alignItems="center"
                  justify="center" spacing={0}>
                
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                    <Card className="track-card">
                                <CardHeader 
                                    title={trade['player_name']}
                                    subheader={trade['username']}
                                  />
                                <CardMedia className="track-img" image="https://via.placeholder.com/150"></CardMedia>
                                <CardContent>
                                  <Typography variant="body2" color="textSecondary" component="p">
                                  {`Sport: ${trade['sport']} \n ${trade['comments']}`}
                                </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton value={trade['id']} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>    */}
                                </CardActions>
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
                  alignItems="center"
                  justify="center" spacing={0}>
                
                {
                    this.state['sales'].map((sale, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                    <Card className="track-card">
                                <CardHeader 
                                    title={sale['player_name']}
                                    subheader={sale['username']}
                                  />
                                <CardMedia className="track-img" image="https://via.placeholder.com/150"></CardMedia>
                                <CardContent>
                                  <Typography variant="body2" color="textSecondary" component="p">
                                  {`Sport: ${sale['sport']} \n ${sale['comments']}`}
                                </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton value={sale['id']} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>    */}
                                </CardActions>
                            </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>

                

            </div>);
        } else {
            return (<div className="home-container">
                        <CircularProgress style={{position: 'absolute', top: '40vh'}} />

                

            </div>);

        }

       
    }

}
export default Wanted;


