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
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';




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




  function valueText(value) {
    return "$" + `${value}`;
  }

export function PriceSlider(data) {
    

    const classes = useStyles();
    const [value, setValue] = React.useState([20, 37]);
  
    const handleChange = (event, newValue) => {
        data.setMin(newValue[0], data.setMax(newValue[1]));
        setValue(newValue);
        data.filterByPrice();
    };
  


    return (
        

        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Price
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valueText}
            />
        </div>

    );
}





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

    const defaultSport = data.selectedSport in sportMap ? sportMap[data.selectedSport] : "View All";
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


export function PriceRangeDropdown(data) {

    const classes = useStyles();
    const [priceRange, setPriceRange] = React.useState([0, 100]);
    const [priceRangeLabel, setPriceRangeLabel] = React.useState("0 - 100");



    const priceMap = {
        "0 - 100": [0, 100],
        "100 - 250": [100, 250],
        "250 - 500": [250, 500],
        "500+": [500, 1000000000]
    };




      const handleChange = (event) => {
        let newValue = priceMap[event.target.value];
        console.log(newValue, event.target.value);
        data.setMin(newValue[0]);
        data.setMax(newValue[1]);
        setPriceRange(newValue);
        setPriceRangeLabel(event.target.value);
        data.filterByPrice(newValue[0], newValue[1]);
      };
    


    return (<div>

    <div style={{width: '100%'}}>
            
        {/* <MenuItem id="demo-simple-select-label" className="mont-text" style={{cursor: 'pointer', color: 'inherit', textDecoration: 'none', fontSize: '0.75em'}}
             aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                 
             {sportLabel}
             
        </MenuItem> */}
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Price Range</InputLabel>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mont-text"
                onChange={handleChange}
                label={priceRangeLabel}
            >
                <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="0 - 100" >0 - 100</MenuItem>
                <MenuItem style={{fontSize: '1.1em'}} className="mont-text" value="100 - 250">100 - 250</MenuItem>
                <MenuItem style={{fontSize: '1.1em'}} className="mont-text"  value="250 - 500">250 - 500</MenuItem>
                <MenuItem style={{fontSize: '1.1em'}} className="mont-text"  value="500+">500+</MenuItem>
            </Select>
        </FormControl>
        
    </div>

      




    </div>)
}













class ForSaleMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport, 'favorite_sales': [], 'maxPrice':null, 'minPrice':null};

    }

    async componentDidMount() {
        axios.get(`/api/all_listings/mobile/sales/${this.state['sport']}`)
        .then(res => {

            this.setState({...this.state, 'sales':res.data.sales})
            console.log(res.data)
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }




    changeSport = (sport) => {

        this.setState({...this.state, 'sport':sport})
        axios.get(`/api/all_listings/mobile/sales/${sport}`)
        .then(res => {
            console.log(res.data);
            this.setState({...this.state, 'sales':res.data.sales,
                            'sport':sport})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }

   

    setMin = (value) => {
        console.log(value);
        this.setState({...this.state, 'minPrice': value})
    }
    setMax = (value) => {
        console.log(value);
        this.setState({...this.state, 'maxPrice': value})
    }


    filterByPrice = (minPrice, maxPrice) => {
            axios.get(`/api/all_listings/mobile/sales/${this.state['sport']}/${[minPrice, maxPrice]}`)
            .then(res => {
                console.log(res.data);
                this.setState({...this.state, 'sales':res.data.sales})
            })
            .catch(err =>  {
                console.log("error :(")
                console.log(err);
            }) 
        
    }






    render() {
        
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
                    <PriceRangeDropdown filterByPrice={this.filterByPrice} setMin={this.setMin} setMax={this.setMax} />

                    {/* <PriceSlider filterByPrice={this.filterByPrice} setMin={this.setMin} setMax={this.setMax} /> */}
                    {/* <div className="price-range-filter">
                        <TextField onChange={this.setMin} variant="filled" className="min-price-filter" id="filled-required" label="Min Price" type="search" variant="outlined" />
                        <TextField onChange={this.setMax} variant="filled" className="max-price-filter" id="filled-required" label="Max Price" type="search" variant="outlined" />
                        <Button className="price-range-filter-btn" onClick={this.filterByPrice}>Go</Button>
                    </div> */}

                    </div>



                </div>
                              
                              
                              
                              
                              
                              
                {('sales' in this.state && this.state['sales']) &&
                <div className="right-side-listing">      
                              <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={3}>
                
                {
                    this.state['sales'].map((sale, index) => 
                    <Grid item xs={12} sm={4} md={4} lg={4}>

                        <Card className="listing-card">
                        <CardHeader className="mont-text" title={sale['player_name']} />
                                    <CardMedia className="track-img" image={sale['img_paths'][0]}></CardMedia>
                                    <CardContent>
                                    <Typography variant="h5" color="textPrimary" component="h6">
                                        ${`${sale['price']}`}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        {sale['year']+ " " + sale['manufacturer'] + " " + sale['cardSeries'] + " " + sale['player_name']}
                                    </Typography>
                                    </CardContent>
                            </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>
        </div>
        } {!('sales' in this.state && this.state['sales']) && 
            <div className="right-side-listing">
                <CircularProgress style={{position: 'absolute', top: '40vh'}} />
            </div>
            }
        
            </div>);
       
    }

}
export default ForSaleMobile;

