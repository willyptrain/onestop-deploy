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
import ImageUploader from 'react-images-upload';
import FormData from 'form-data';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';




class CreateListing extends Component {

    constructor(props) {
        super(props);
        this.sportList = ["Baseball", "Basketball", "Football", "Hockey",
                            "Wrestling/Fighting", "Soccer", "Racing", "Other/Gaming"];
        
        this.yearList = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901, 1900];
        this.cardManufacturers = ['ACEO Reprint', 'Action Packed', 'American Caramel', 'American Tobacco', 'Baseball Card Magazine', 'Best', 'Big League Chew', 'Bowman', 'Classic', 'CMC', 'Collect-a-Card', 'Collectors Edge', 'Donruss', 'DuoCards', 'E98', 'Fleer', 'Fritsch', 'Front Row', 'Futera', 'Globe Imports', 'Goudey Gum Co.', 'Gum, Inc. ', 'Guyana', 'Hostess ', 'Hygrade', 'Impel', 'In the Game', 'Interlake', 'Jimmy Dean', 'Jumbo Sunflower Seeds', 'Just', "Kellogg's", 'Leaf', 'Lime Rock', 'Line Drive', "M&M's", 'Matallic Impressions', 'Maxx', 'Megacards ', 'Milk-Bone', 'MSA', 'National Caramel', 'National Chicle', 'NBA Hoops', 'O-Pee-Chee', 'Old Judge', 'Onyx', 'Other: List your Brand', 'Pacific', 'Panini', 'Parkins Parkhurst', 'Philadelphia Gum', 'Pinnacle', 'Playoff', 'Post', 'PressPass', 'Pro Mags', 'Pro Set', 'Quaker', 'Razor', 'Rembrandt', 'Renata Galasso', 'Royal Rookies', 'Sage', 'Score', 'Scoreboard', 'Semic', 'Signature Rookies', 'Skybox', 'Sportflics', 'Sporting News', 'Sports Illustrated', 'SSPC', 'Star', 'Star Pics', 'Starline', 'Superior Pix', 'TCMA', 'Team Best', 'Ted Williams Card Company', 'Tombstone Pizza', 'Topps', 'Triad', 'Tristar', 'Upper deck', 'Utz', 'Wheels', 'Wild Card', 'William Paterson', 'Wonder Bread'];
        
        
        //RECENTLY REMOVED edit from the initial this.state even though it is in props because I can now launch edit page from url instead
        this.state = {'edit':props.edit,'images': [], 'item_id': 'id' in props ? props.id.id : null, 'type': props.type, 
                    'checked': []}; 
        this.addImages.bind(this);
    }

    async componentDidMount() {
        console.log(this.state['item_id'], this.state['type'])
        if(this.state['item_id'] && this.state['type']) {
            let token = localStorage.access_token;
            if(this.state['type'] == "trade") {
                
                axios.get(`/api/trade_lookup/${this.state['item_id']}/${token}`)
                .then(res => {
                    this.setState({...this.state, ...res.data,'submitted': false});
                    console.log(res.data);
                })
                .catch(err =>  {
                    

                })
                axios.get(`/api/wanted/trades/all/${token}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({...this.state, 'wanted_trades':res.data.trades});
                })
                .catch(err =>  {
                    

                })
            } else if(this.state['type'] == "sale") {
                axios.get(`/api/sale_lookup/${this.state['item_id']}/${token}`)
                .then(res => {
                    this.setState({...res.data,  'submitted': false});
                })
                .catch(err =>  {

                })
                axios.get(`/api/wanted/trades/all/${token}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({...this.state, 'wanted_trades':res.data.trades});
                })
                .catch(err =>  {
                    

                })
            }

        } else {
            let token = localStorage.access_token;
            axios.get(`/api/wanted/trades/all/${token}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({...this.state, 'wanted_trades':res.data.trades});
                })
                .catch(err =>  {
                    

                })
        }


        

    }


    handleToggle = (index) => () => {
        let currentIndex = this.state['checked'].indexOf(index);
        let new_checked = [...this.state['checked']];
    
        if (currentIndex === -1) {
            new_checked.push(index);
        } else {
            new_checked.splice(currentIndex, 1);
        }
    
        this.setState({...this.state, 'checked':new_checked});
        console.log(new_checked)
      };





    selectSport = (event) => {
        this.setState({...this.state, 'sport':event.target.value});
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
        this.setState({...this.state, 'player_name':event.target.value});
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

    validateForm() {
        if(this.state['tradeOrSell'] == "Trade") {
            return this.state['cardSeries'].length > 0 && this.state['sport'].length > 0 &&
                    this.state['year'].length > 0 && this.state['manufacturer'].length > 0 && 
                    this.state['player_name'].length > 0 && this.state['cardNumber'].length > 0;
        } else {
            return this.state['cardSeries'].length > 0 && this.state['sport'].length > 0 &&
            this.state['year'].length > 0 && this.state['manufacturer'].length > 0 && 
            this.state['player_name'].length > 0 && this.state['cardNumber'].length > 0 &&
            this.state['price'].length > 0;
        }
    }
    createAListing = (event) => {
        let token = localStorage.access_token;
        console.log(this.state['images'])

        let form_data = new FormData();
        form_data.append('checked', 'checked' in this.state ? this.state['checked'] : []);
        form_data.append('sport', 'sport' in this.state ? this.state['sport'] : "");
        form_data.append('player_name', 'player_name' in this.state ? this.state['player_name'] : "");
        form_data.append('year', 'year' in this.state ? this.state['year'] : 0);
        form_data.append('manufacturer', 'manufacturer' in this.state ? this.state['manufacturer'] : "");
        form_data.append('cardNumber', 'cardNumber' in this.state ? this.state['cardNumber'] : "");
        form_data.append('cardSeries', 'cardSeries' in this.state ? this.state['cardSeries'] : "");
        form_data.append('comments', 'comments' in this.state ? this.state['comments'] : "");
        form_data.append('tradeOrSell','tradeOrSell' in this.state ? this.state['tradeOrSell'] : "Trade");
        form_data.append('price', 'price' in this.state ? this.state['price'] : 0);
        this.state['images'].forEach(file => {
            form_data.append(file.name, file)
        })
        if(!this.state['edit']) {
            axios.post(`/api/listing/create/${token}`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then(res => {
                console.log(res.data);
                this.setState({...res.data,  'submitted': true});
            })
            .catch(err =>  {
                console.log("error")
                console.log(err)
                this.setState({'error':err,'userInfo': 'Not logged in'})

            })
        } else {
            if(this.state['item_id'] != null) {
                if(this.state['type'] == "trade") {
                    axios.post(`/api/listing/edit/trade/${this.state['item_id']}/${token}`, form_data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    .then(res => {
                        console.log(res.data);
                        this.setState({...res.data,  'submitted': true});
                    })
                    .catch(err =>  {
                        console.log("error")
                        console.log(err)
                        this.setState({'error':err,'userInfo': 'Not logged in'})

                    })
                }
                else if(this.state['type'] == "sale") {
                    axios.post(`/api/listing/edit/sale/${this.state['item_id']}/${token}`, form_data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    .then(res => {
                        console.log(res.data);
                        this.setState({...res.data,  'submitted': true});
                    })
                    .catch(err =>  {
                        console.log("error")
                        console.log(err)
                        this.setState({'error':err,'userInfo': 'Not logged in'})

                    })
                }
            }
        }
    }

    addImages = (files, dataUrl) => {

        this.setState({...this.state, 'images':files})
    }


    render() {

        console.log(this.state);


        if (this.state.id && this.state.submitted == true) {
            if(this.state.tradeOrSell == "Trade") {
                return <Redirect {...this.state} url={`/view_listing/trades/${this.state.id}`} />
            }
            if(this.state.tradeOrSell == "Sell") {
                return <Redirect {...this.state} url={`/view_listing/sales/${this.state.id}`} />
            }
            
          }
        if(this.state.error && this.state.userInfo == "Not logged in") {
            return <Redirect {...this.state} url={`/`} />
        }
    return (<div className="home-container flex-container">
    <div className="left-container-create">
    <Card className="listing-container overflowScroll">
            {/* <h2 className="listing-header mont-text">Create A Listing</h2> */}
            <CardHeader title="Create A Listing" titleTypographyProps={{className:"mont-text"}} subheader="Post new trades and sale for others to buy or trade for" />
            <CardContent>
                <div className="form-root">    
                    
                    
                    <div className="fullwidth-field-container">
                        <Typography variant="body1" className="listing-field-helper mont-text">Player Name</Typography>
                        <TextField required form="listing-form"
                            id="standard-adornment-amount"
                            placeholder="Johnny Doe"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            value={this.state.player_name}
                            className="fullwidth-field-item"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.typePlayer}
                            />
                    </div>

                        
                        
                    <TextField required form="listing-form" class="standard-select-currency-native" value={this.state['sport']} 
                    select placeholder="Placeholder" onChange={this.selectSport} 
                        style={{textAlign: 'left', width: '20%' }} variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                        {this.sportList.map((sport) => 
                            <MenuItem key={sport} value={sport}>
                                {sport}
                            </MenuItem>
                        )}

                    </TextField>
                
                    <TextField required form="listing-form" class="standard-select-currency-native" value={this.state['tradeOrSell']} 
                    select onChange={this.tradeOrSell} 
                        style={{ minWidth: 150, textAlign: 'left' }} variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                            <MenuItem key={"Trade"} value={"Trade"}>
                                Trade
                            </MenuItem>
                            <MenuItem key={"Sell"} value={"Sell"}>
                                Sell
                            </MenuItem>

                    </TextField>

                    <FilledInput required={this.state['tradeOrSell'] != "Sell"}
                    form="listing-form" error={this.state['tradeOrSell'] == "Sell" && (!this.state.price || this.state.price == "")}
                        id="filled-adornment-amount"
                        disabled={this.state['tradeOrSell'] != "Sell"}
                        value={this.state['price']}
                        onChange={this.setPrice}
                        startAdornment={<InputAdornment variant="filled" position="start">$</InputAdornment>}
                    />


                  
                
                

                    

                <div className="fullwidth-field-container flex-container">
                    <div className="flex-left">
                    <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} variant="subtitle1" align="left">Card Manufacturer</Typography>
                    <TextField required form="listing-form" id="standard-select-currency-native" value={this.state.manufacturer} 
                    select placeholder="Placeholder" style={{float: 'left'}} onChange={this.selectManufacturer}
                    variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                        {this.cardManufacturers.map((manufacturer) => 
                            <MenuItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </MenuItem>
                        )}

                    </TextField>
                    </div>

                    <div className="flex-right">
                    <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} variant="subtitle1" align="left">Year</Typography>
                    <TextField style={{float: 'left'}} required form="listing-form" class="standard-select-currency-native" value={String(this.state.year)} 
                    select onChange={this.selectYear}
                    variant="filled" InputLabelProps={{
                            shrink: true,
                        }}>
                        {this.yearList.map((year) => 
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        )}

                    </TextField>
                    </div>
                
                </div>

                <div style={{width: '80%', textAlign: 'left'}}>
                    <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} variant="subtitle1" align="left">Card Number</Typography>
                    <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} color="textSecondary" 
                            variant="subtitle2" align="left">Serial number written on card</Typography>
                    <TextField className="listing-full-label"
                            required
                            form="listing-form"
                            id="standard-adornment-amount"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            placeholder="123456789"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!this.state.cardNumber || this.state.cardNumber == ""}
                            onChange={this.setCardNumber}
                            />
                </div>
                    <div style={{width: '80%', textAlign: 'left'}}>
                        <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} variant="subtitle1" align="left">Card Series/Set</Typography>
                        <Typography style={{fontFamily: 'Montserrat !important', marginLeft: '8px'}} color="textSecondary" 
                            variant="subtitle2" align="left">Example: Update Series, Series 2, etc. </Typography>
                        <TextField required className="listing-full-label"
                            id="standard-adornment-amount"
                            fullWidth
                            margin="normal"
                            placeholder="Card Series or Set"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.setCardSeries}
                            error={!this.state.cardSeries || this.state.cardSeries == ""}
                            />

                    </div>
                    <div style={{width: '100%', textAlign: 'left'}}>
                        <Typography style={{fontFamily: 'Montserrat !important'}} variant="subtitle1" align="left">Additional Details/Comments</Typography>
                        <TextareaAutosize form="listing-form" className="text-area" style={{background: '#efefef', fontFamily: 'Montserrat !important', width: '80%'}}
                            aria-label="minimum height" onChange={this.setComments} rowsMin={6} placeholder="" />

                    </div>
                    
                <Button type="submit" onClick={this.createAListing} variant="contained">Submit</Button>

            </div>
            </CardContent>
        </Card>
        </div>
        <div className="right-container-create">

            {this.state['tradeOrSell'] == "Trade" && 
            <div className="wanted-cards-container" style={{border: '2px solid black'}}>
                <Card>
                    <CardHeader title="Your Favorited Trades" titleTypographyProps={{className:"mont-text"}} subheader="Select which cards you'd like in return" />
                    <CardContent>
                    <List>
                    {'wanted_trades' in this.state && this.state['wanted_trades'] &&
                        this.state['wanted_trades'].map((trade, index) =>
                            <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(trade['id'])}>

                            <ListItemAvatar>
                                        <Avatar variant={"rounded"}
                                            alt={`Card Image`}
                                            src={trade['img_paths'][0]}
                                        />
                            </ListItemAvatar>


                            <ListItemText id={trade['id']} primary={trade['player_name']} />

                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state['checked'].indexOf(trade['id']) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': index }}
                                />
                            </ListItemIcon>
                            </ListItem>
                        
                        ) 

                    }
                    </List>
                    </CardContent>
                </Card>
            </div>}

            <div className="image-uploader-container">
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.addImages}
                    imgExtension={['.jpeg', '.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                />
            </div>
        </div>

        </div>)
       
    }

}
export default CreateListing;

