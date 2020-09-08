import React, { Component, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Redirect from '../redirect.js';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import './navStyle.scss';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../images/logo_transparent.png';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';





export function MenuDropdown(props) {
    return (
      <ul className="submenu-container">
        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/all`}>View All</a>
        </li>

        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/baseball`}>Baseball</a>
        </li>

        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/basketball`}>Basketball</a>
        </li>

        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/football`}>Football</a>
        </li>

        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/hockey`}>Hockey</a>
        </li>

        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/wrestling`}>Wrestling</a>

        </li>
        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/soccer`}>Soccer</a>

        </li>
        <li className="submenu-item ">
          <a className="submenu-text" href={`/${props.type}/racing`}>Racing</a>

        </li>
        <li className="submenu-item ">
          <a className="submenu-text" style={{height: '4vh !important'}} href={`/${props.type}/gaming`}>Gaming</a>
        </li>
        
      </ul>
    )
}


export function NavBar(data) {




      const useStyles = makeStyles({
        list: {
          width: 450,
          background: '#141518'
        },
        fullList: {
          width: 'auto',
        },
      });
      const [searchResults, setSearchResults] = React.useState([]);
      const [hideDropdown, setHideDropdown] = React.useState(true);

      const [open, setOpen] = React.useState(false)
      const [redirectHome, setRedirectHome] = React.useState(false)


      const classes = useStyles();


      const searchChange = (event) => {
        if(event.currentTarget.value == "") {
          setHideDropdown(true);
        }
        else {
          let token = localStorage.access_token;
          axios.get(`/api/search/${event.currentTarget.value}/${token}`)
          .then(res => {
              setSearchResults(res.data.results);
              if(res.data.results.length > 0) {
                setHideDropdown(false);
              }
              console.log(res.data)
          })
          .catch(err =>  {
              console.log(err)
          })

        }
      }

      const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(open)
      };

      const signout = () => {
        let token = localStorage.access_token;
        axios.get('/api/users/signout/${token}')
        .then(res => {
          console.log(res.data)
          setRedirectHome(true);
        })
        .catch(err =>  {
            console.log(err)
        })
      }




      return (
        <div>
        {redirectHome &&
          <Redirect url={`/`}  />
        }


           <AppBar position="fixed" style={{backgroundColor: '#141518'}}>
            <Toolbar>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon style={{color: 'white'}} />
            </IconButton>
            <a href={`/`} className="navbar-img">
                  <img src={logo} className="nav-logo" />
            </a>




            <div className="right-nav">
                  <div className="search-bar">
                <Paper component="form" className={classes.root}>
                    <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                          
                            <InputBase
                            placeholder="Search…"
                            classes="search-input"
                            onChange={searchChange}
                            inputProps={{ 'aria-label': 'search' }}
                          />

                </Paper>
                <div style={{width: '100%', float: 'right', display: (!hideDropdown ? 'block' : 'none')}}>

                          <div className="autocomplete">

                            
                                  <List>
                                    {searchResults.map((res, index) =>
                                            <ListItem divider={true} component="a" href={`/${res.tradeOrSell == "Trade" ? 'for_trade' : 'for_sale'}/item/${res.id}`}>
                                                <ListItemAvatar>
                                                  <Avatar
                                                    alt="Trade Image" 
                                                    variant="rounded"
                                                    src={res['img_paths'][0]}
                                                  />
                                                </ListItemAvatar>
                                              <ListItemText className='search-primary' primary={res['player_name']} secondary={res['sport']} />
                                            <Divider />
                                            </ListItem>
                                              )}

                                </List>

                            </div>
                </div>
                </div>

                <div className="nav-signout-container">
                  <IconButton className="drawer-exit-btn" href="/shopping_cart">
                    <ShoppingCartIcon size="large" style={{color: 'white'}} />
                  </IconButton>
                  <Button className="signout-btn mont-text" onClick={signout} variant="filled">Signout</Button>
                </div>

                </div>








            </Toolbar>
        </AppBar>



        <div
      className="sidebar-container"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        <Drawer PaperProps={{className:"drawer"}} anchor='left' open={open}>
          <div className="exit-drawer">
            <IconButton className="drawer-exit-btn" onClick={toggleDrawer(false)}>
                <ArrowBackIosIcon size="large" style={{color: 'white'}} />
              </IconButton>
          </div>
          <List className="nav-menu">
                    <ListItem alignItems="center" component="a" button href={`/for_trade/all`} className="nav-menu-item">
                     For Trade
                      <MenuDropdown type={"for_trade"} />
                    </ListItem>
                    

                    <ListItem alignItems="center" component="a" button href={`/for_sale/all`} className="nav-menu-item">
                     For Sale
                      <MenuDropdown type={"for_sale"} />
                    </ListItem>


                    
                    <ListItem alignItems="center" button href={`/wanted/all`} component="a" className="nav-menu-item">
                      Wanted
                      <MenuDropdown type={"wanted"} />
                    </ListItem>
                    <ListItem alignItems="center" button  href={`/my_listings`} component="a" className="nav-menu-item">
                      My Listings
                    </ListItem>
                    <ListItem alignItems="center"  button href={`/create_listing`} component="a" className="nav-menu-item">
                      Create A Listing
                    </ListItem>
                    <ListItem alignItems="center" button  href={`/about`} component="a" className="nav-menu-item">
                      About Us
                    </ListItem>
                    <ListItem alignItems="center" button  href={`/notifications`} component="a" className="nav-menu-item">
                            Orders
                    </ListItem> 
                  </List>
          </Drawer>
        
          </div>
        
        
        
        
        
        
        
        {/* <AppBar position="fixed" style={{backgroundColor: '#141518'}}>
            <Toolbar>
              {'status' in data && data.status == 'logged in' && 'userInfo' in data && data.userInfo && 
                <div className="left-nav">
                <nav className="nav">
                  <ul className="nav-menu">
                    <li className="nav-menu-item">
                      <a href={`/for_trade/all`}>For Trade</a>
                      <MenuDropdown type={"for_trade"} />
                    </li>
                    <li
                      className="nav-menu-item"
                    >
                      <a href={`/for_sale/all`}>For Sale</a>
                      <MenuDropdown type={"for_sale"} />
                    </li>
                    <li className="nav-menu-item">
                      <a href={`/wanted/all`}>Wanted</a>
                      <MenuDropdown type={"wanted"} />
                    </li>
                    <li className="nav-menu-item">
                      <a href={`/my_listings`}>My Listings</a>
                    </li>
                    <li className="nav-menu-item">
                      <a href={`/create_listing`}>Create A Listing</a>
                    </li>
                    <li className="nav-menu-item">
                      <a href={`/about`}>About Us</a>
                    </li>
                    <li className="nav-menu-item">
                            <a href={`/notifications`}>Orders</a>

                    </li> 
                  </ul>
                </nav>
                <a href={`/`} className="navbar-img">
                  <img src="../logo.png" className={classes.logo} />
                </a>

              </div>}


                    
                
                
                <div className="right-nav">
                  <div className="search-bar">
                <Paper component="form" className={classes.root}>
                    <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                          
                            <InputBase
                            placeholder="Search…"
                            classes={classes.input}
                            onChange={searchChange}
                            inputProps={{ 'aria-label': 'search' }}
                          />

                </Paper>
                <div style={{width: '100%', float: 'right', display: (!hideDropdown ? 'block' : 'none')}}>

                          <div className="autocomplete">

                            
                                  <List>
                                    {searchResults.map((res, index) =>
                                            <ListItem divider={true} component="a">
                                                <ListItemAvatar>
                                                  <Avatar
                                                    alt="Trade Image" 
                                                    variant="rounded"
                                                    src={res['img_paths'][0]}
                                                  />
                                                </ListItemAvatar>
                                              <ListItemText className='search-primary' primary={res['player_name']} secondary={res['sport']} />
                                            <Divider />
                                            </ListItem>
                                              )}

                                </List>

                            </div>

                    
                    </div>
                    </div>


                    
                  

                    {!data.loggedIn && <Button value={true} className={classes.button} onClick={data.setModal} variant="outlined">Login</Button>}
                    {data.loggedIn && <Button value={true} className={classes.button} onClick={data.setModal} variant="outlined">Logout</Button>}


                </div>

                  
            </Toolbar>
            </AppBar> */}

      </div>);

}


class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = props;
          




    }

    

    async componentDidMount() {

    }

    
    

    render() {
        return (<div>
           <NavBar {...this.state} />
          

        </div>)
       
    }

}
export default Navbar;