import React, { Component } from 'react';
import Redirect from '../redirect.js';
import axios from 'axios';
import './listing.css';
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




class CreateListing extends Component {

    constructor(props) {
        super(props);
        this.sportList = ["Baseball", "Basketball", "Football", "Hockey",
                            "Wrestling/Fighting", "Soccer", "Racing", "Other/Gaming"];
        
        this.yearList = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901, 1900];
        this.cardManufacturers = ['ACEO Reprint', 'Action Packed', 'American Caramel', 'American Tobacco', 'Baseball Card Magazine', 'Best', 'Big League Chew', 'Bowman', 'Classic', 'CMC', 'Collect-a-Card', 'Collectors Edge', 'Donruss', 'DuoCards', 'E98', 'Fleer', 'Fritsch', 'Front Row', 'Futera', 'Globe Imports', 'Goudey Gum Co.', 'Gum, Inc. ', 'Guyana', 'Hostess ', 'Hygrade', 'Impel', 'In the Game', 'Interlake', 'Jimmy Dean', 'Jumbo Sunflower Seeds', 'Just', "Kellogg's", 'Leaf', 'Lime Rock', 'Line Drive', "M&M's", 'Matallic Impressions', 'Maxx', 'Megacards ', 'Milk-Bone', 'MSA', 'National Caramel', 'National Chicle', 'NBA Hoops', 'O-Pee-Chee', 'Old Judge', 'Onyx', 'Other: List your Brand', 'Pacific', 'Panini', 'Parkins Parkhurst', 'Philadelphia Gum', 'Pinnacle', 'Playoff', 'Post', 'PressPass', 'Pro Mags', 'Pro Set', 'Quaker', 'Razor', 'Rembrandt', 'Renata Galasso', 'Royal Rookies', 'Sage', 'Score', 'Scoreboard', 'Semic', 'Signature Rookies', 'Skybox', 'Sportflics', 'Sporting News', 'Sports Illustrated', 'SSPC', 'Star', 'Star Pics', 'Starline', 'Superior Pix', 'TCMA', 'Team Best', 'Ted Williams Card Company', 'Tombstone Pizza', 'Topps', 'Triad', 'Tristar', 'Upper deck', 'Utz', 'Wheels', 'Wild Card', 'William Paterson', 'Wonder Bread'];
        this.state = {"player": null, 'selectedSport': this.sportList[0], "tradeOrSell": "Trade", "year":this.yearList[0],
                        "price": 0, 'manufacturer':this.cardManufacturers[0]}; 
    }

    async componentDidMount() {
        // let token = localStorage.access_token;
        // console.log(token);
        // axios.get(`/api/users/${token}`)
        // .then(res => {
        //     this.setState()
        // })
        // .catch(err =>  {
            

        // })

    }

    selectSport = (event) => {
        this.setState({...this.state, 'selectedSport':event.target.value});
    }

    selectYear = (event) => {
        this.setState({...this.state, 'year':event.target.value});
    }

    tradeOrSell = (event) => {
        this.setState({...this.state, 'tradeOrSell':event.target.value});
    }
    setPrice = (event) => {
        this.setState({...this.state, 'price':event.target.value});
    }
    selectManufacturer = (event) => {
        this.setState({...this.state, 'manufacturer':event.target.value});
    }

    typePlayer = (event) => {
        this.setState({...this.state, 'player':event.target.value});
    }

    setCardNumber = (event) => {
        this.setState({...this.state, 'cardNumber':event.target.value});
    }

    setComments = (event) => {
        this.setState({...this.state, 'comments':event.target.value});
    }

    setCardSeries = (event) => {
        this.setState({...this.state, 'cardSeries':event.target.value});
    }

    createAListing = (event) => {
        let token = localStorage.access_token;
        if(!this.state['player']) {

        }
        axios.post(`/api/listing/create/${token}`, {
            'sport': 'selectedSport' in this.state ? this.state['selectedSport'] : "",
            'player': 'player' in this.state ? this.state['player'] : "",
            'year': 'year' in this.state ? this.state['year'] : 0,
            'manufacturer': 'manufacturer' in this.state ? this.state['manufacturer'] : "",
            'cardNumber': 'cardNumber' in this.state ? this.state['cardNumber'] : "",
            'cardSeries': 'cardSeries' in this.state ? this.state['cardSeries'] : "",
            'comments': 'comments' in this.state ? this.state['comments'] : "",
            'tradeOrSell':'tradeOrSell' in this.state ? this.state['tradeOrSell'] : "Trade",
            'price': 'price' in this.state ? this.state['price'] : 0,
        })
        .then(res => {
            console.log(res.data);
            this.setState(res.data);
        })
        .catch(err =>  {
            console.log(err)
            this.setState({'userInfo': 'Not logged in'})

        })
    }



    render() {
        if (this.state.id) {
            if(this.state.tradeOrSell == "Trade") {
                return <Redirect {...this.state} url={`/view_listing/trades/${this.state.id}`} />
            }
            if(this.state.tradeOrSell == "Sell") {
                return <Redirect {...this.state} url={`/view_listing/sales/${this.state.id}`} />
            }
            console.log(this.state.tradeOrSell);
          }
        return (<div className="listing-container">
            <h2 className="listing-header">Create A Listing</h2>
            <div className="form-root">    
               {/* <form onSubmit={this.createAListing} id="listing-form"> */}
                <TextField required form="listing-form" className="listing-full-label"
                    error={!this.state.player || this.state.player == ""}
                    id="standard-adornment-amount"
                    label="Player Name"
                    style={{ margin: 8 }}
                    placeholder="Johnny Doe"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.typePlayer}
                    />
            <TextField required form="listing-form" class="standard-select-currency-native" value={this.state['selectedSport']} 
            label="Sport" select placeholder="Placeholder" onChange={this.selectSport} 
                style={{ margin: 8, textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                    shrink: true,
                }}>
                {this.sportList.map((sport) => 
                    <MenuItem key={sport} value={sport}>
                        {sport}
                    </MenuItem>
                )}

            </TextField>
        
            <TextField required form="listing-form" class="standard-select-currency-native" value={this.state['tradeOrSell']} 
            label="Trade Or Sell" select onChange={this.tradeOrSell} 
                style={{ margin: 8, minWidth: 150, textAlign: 'left' }} variant="filled" InputLabelProps={{
                    shrink: true,
                }}>
                    <MenuItem key={"Trade"} value={"Trade"}>
                        Trade
                    </MenuItem>
                    <MenuItem key={"Sell"} value={"Sell"}>
                        Sell
                    </MenuItem>

            </TextField>

            <TextField required form="listing-form" class="standard-select-currency-native" value={this.state['year']} 
            label="Year" select placeholder="Placeholder" onChange={this.selectYear}
                style={{ margin: 8 }} variant="filled" InputLabelProps={{
                    shrink: true,
                }}>
                {this.yearList.map((year) => 
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                )}

            </TextField>
        
        
            <FilledInput required={this.state['tradeOrSell'] != "Sell"}
            form="listing-form" error={this.state['tradeOrSell'] == "Sell" && (!this.state.price || this.state.price == "")}
                id="filled-adornment-amount"
                disabled={this.state['tradeOrSell'] != "Sell"}
                label="(If for sale):"
                value={this.state['price']}
                onChange={this.setPrice}
                style={{ margin: 8 }} 
                startAdornment={<InputAdornment variant="filled" position="start">$</InputAdornment>}
            />

            
            <div style={{border: '2px solid black', height: '10vh', width: '80%', marginLeft: '10%'}}>
            <h4>Wanted Cards In Return: *put something here*</h4>
            </div>

            <TextField required form="listing-form" id="standard-select-currency-native" value={this.state['manufacturer']} 
            label="Card Manufacturer" select placeholder="Placeholder" onChange={this.selectManufacturer}
                style={{ margin: 8 }} variant="filled" InputLabelProps={{
                    shrink: true,
                }}>
                {this.cardManufacturers.map((manufacturer) => 
                    <MenuItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                    </MenuItem>
                )}

            </TextField>

            <TextField className="listing-full-label"
                    required
                    form="listing-form"
                    id="standard-adornment-amount"
                    label="Card Number"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!this.state.cardNumber || this.state.cardNumber == ""}
                    onChange={this.setCardNumber}
                    />

            <div style={{width: '80%', textAlign: 'left'}}>
                <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} variant="subtitle1" align="left">Card Series/Set</Typography>
                <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} color="textSecondary" 
                    variant="subtitle2" align="left">Example: Update Series, Series 2, etc. </Typography>
                <TextField required className="listing-full-label"
                    id="standard-adornment-amount"
                    label="Card Series/Set"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.setCardSeries}
                    error={!this.state.cardSeries || this.state.cardSeries == ""}
                    />

            </div>
            <div style={{width: '100%', textAlign: 'left', marginLeft: '8px'}}>
                <Typography style={{fontFamily: 'Montserrat !important'}} variant="subtitle1" align="left">Additional Details/Comments</Typography>
                <TextareaAutosize form="listing-form" style={{background: '#efefef', fontFamily: 'Montserrat !important', width: '80%'}}
                    aria-label="minimum height" onChange={this.setComments} rowsMin={6} placeholder="" />

            </div>

            <Button type="submit" onClick={this.createAListing} variant="contained">Submit</Button>

            {/* </form> */}

            </div>


        </div>)
       
    }

}
export default CreateListing;

