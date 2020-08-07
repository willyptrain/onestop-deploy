import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));



  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);



export function SelectSport(data) {
    const classes = useStyles();
    const [sport, setSport] = React.useState('');

    const handleChange = (event) => {
        setSport(event.target.value);
        data.changeSport(event.target.value)
      };


    return (<div>
        {/* <FormControl className={classes.margin}> */}
        <InputLabel id="demo-customized-select-label">Filter by Sport</InputLabel>
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={sport}
            onChange={handleChange}
            >
                <MenuItem value="all">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"baseball"}>Baseball</MenuItem>
                <MenuItem value={"basketball"}>Basketball</MenuItem>
                <MenuItem value={"football"}>Football</MenuItem>
                <MenuItem value={"hockey"}>Hockey</MenuItem>
                <MenuItem value={"wrestling"}>Wrestling</MenuItem>
                <MenuItem value={"soccer"}>Soccer</MenuItem>
                <MenuItem value={"racing"}>Racing</MenuItem>
                <MenuItem value={"gaming"}>Other/Gaming</MenuItem>
            </Select>
      {/* </FormControl> */}



    </div>)
}











class ForTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport, 'favorite_trades':[]};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/all_listings/trades/${this.state['sport']}/${token}`)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, 'trades':res.data.trades,
                                'favorite_trades': res.data.wantedCards})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }



    changeSport = (sport) => {
        let token = localStorage.access_token;
        axios.get(`/api/all_listings/trades/${sport}/${token}`)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, 'trades':res.data.trades,
                                'favorite_trades': res.data.wantedCards})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }












    addToFavorites = (event) => {
        let id = event.currentTarget.value;
        let token = localStorage.access_token;
        axios.post(`/api/post_wanted/trades/${id}/${token}`)
        .then(res => {
            this.setState({...this.state, 'favorite_trades':res.data[0]})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }


    render() {
        if('trades' in this.state && this.state['trades']) {
            return (<div className="home-container">

                <div className="filter-container">
                    <SelectSport changeSport={this.changeSport} />

                </div>



                              <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={0}>
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                    <Card className="track-card">
                                <CardActionArea href={`/for_trade/item/${trade['id']}`}>
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
                                <CardActions disableSpacing>
                                    <IconButton value={trade['id']} color={this.state['favorite_trades'].includes(trade['id']) ? "primary" : "default"} onClick={this.addToFavorites} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>   
                                    
                                </CardActions>
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
export default ForTrade;

