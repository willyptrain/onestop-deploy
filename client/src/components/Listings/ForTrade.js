import React, { Component } from 'react';
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
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import PageviewIcon from '@material-ui/icons/Pageview';

import TradingCard from './../Card/TradingCard.js';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
margin: {
  margin: theme.spacing(1),
},
formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
    const [sport, setSport] = React.useState(data.selectedSport);

    const sportMap = {
        'all': 'View All',
        'baseball': 'Baseball',
        'basketball': 'Basketball',
        'football': 'Football',
        'hockey': 'Hockey',
        'wrestling': 'Wrestling',
        'soccer': 'Soccer',
        'racing': 'Racing',
        'gaming': 'Other/Gaming',
    }

    const defaultSport = data.selectedSport in sportMap && data.selectedSport ? sportMap[data.selectedSport] : "View All";
    const [sportLabel, setSportLabel] = React.useState(defaultSport);
   


      const handleChange = (event) => {
        console.log(event.target.value)
        setSportLabel(sportMap[event.target.value]);
        setSport(event.target.value);
        data.changeSport(event.target.value);
      };
    


    return (<div>

    <div style={{width: '100%'}}>
            
        {/* <MenuItem id="demo-simple-select-label" className="mont-text" style={{cursor: 'pointer', color: 'inherit', textDecoration: 'none', fontSize: '0.75em'}}
             aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                 
             {sportLabel}
             
        </MenuItem> */}
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sport</InputLabel>

        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="mont-text"
            onChange={handleChange}
            label={sportLabel}
        >
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="all" >View All</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="baseball">Baseball</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text"  value="basketball">Basketball</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text"  value="football">Football</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="hockey">Hockey</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="wrestling">Wrestling</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="soccer">Soccer</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="racing">Racing</MenuItem>
            <MenuItem style={{fontSize: '1.1em'}} className="mont-text"  value="gaming">Other/Gaming</MenuItem>
        </Select>
        </FormControl>
      </div>
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
            let trade_ids = [];
            for (let i=0; i< res.data.wantedCards.length; i++) {
                trade_ids.push(res.data.wantedCards[i]['id'])
            }
            this.setState({...this.state, 'trades':res.data.trades,
                                'favorite_trades': res.data.wantedCards, 'favorite_trade_ids':trade_ids})
                                
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
            // this.setState({...this.state, 'trades':res.data.trades,
            //                     'favorite_trades': res.data.wantedCards,
            //                 'selectedSport':sport})
            let trade_ids = [];
            for (let i=0; i< res.data.wantedCards.length; i++) {
                trade_ids.push(res.data.wantedCards[i]['id'])
            }
            this.setState({...this.state, 'sport':sport, 'trades':res.data.trades, "favorite_trades":res.data.wantedCards, 'favorite_trade_ids':trade_ids})

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
            console.log(res.data);
            this.setState({...this.state, "favorite_trades": res.data.wanted_trade_ids})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }

   


    render() {

      console.log(this.state);
        
            return (<div className="home-container">


                <div className="filter-container">
                  <div className="filter-inner">
                {/* <Paper component="form" className="search-bar-listing">
                    <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                          
                            <InputBase
                            placeholder="Search…"
                            classes="search-input"
                            onChange={this.searchChange}
                            inputProps={{ 'aria-label': 'search' }}
                          />

                </Paper> */}
                      <SelectSport selectedSport={this.state['sport']} changeSport={this.changeSport} />

                  </div>

                </div>
                {('trades' in this.state && this.state['trades']) && this.state['trades'].length > 0 &&
                <div className="right-side-listing">

                              <Grid container className="grid-container"spacing={5}>
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={12} sm={4} md={4} lg={4}>

                    {/* <Card className="listing-card">
                                <CardActionArea href={`/for_trade/item/${trade['id']}`}>
                                    <CardHeader 
                                        title={trade['player_name']}
                                        subheader={trade['username']}
                                    />
                                    <CardMedia className="track-img" image={trade['img_paths'][0]}></CardMedia>
                                    <CardContent>
                                    
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        {trade['year']+ " " + trade['manufacturer'] + " " + trade['cardSeries'] + " " + trade['player_name']}
                                    </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <IconButton value={trade['id']} color={this.state['favorite_trades'].includes(trade['id']) ? "primary" : "default"} onClick={this.addToFavorites} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>   
                                    
                                </CardActions>
                            </Card> */}
                        {/* <TradingCard url="for_trade/item" trade={trade} /> */}
                        <TradingCard  favorite={true} url="for_trade/item" favorite_trades={this.state['favorite_trades']} favorite_func={this.addToFavorites} trade={trade} />

                    </Grid>
                    
                    
                    )}
                    </Grid>
                    </div>
            } 
            {('trades' in this.state && this.state['trades']) && this.state['trades'].length == 0
            && 
            <div className="home-container">
              <p>No Trades</p>
            </div>
            
            
            }
            
            {!('trades' in this.state && this.state['trades']) && 
            <div className="right-side-listing">
                <CircularProgress style={{position: 'absolute', top: '40vh'}} />
            </div>
            }
            </div>);

       
    }

}
export default ForTrade;

