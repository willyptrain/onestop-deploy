import React, { Component } from 'react';
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
// import {logo} from '../../images/logo.png';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';






{/* <MenuItem component={Link} href={`/${pageOption}/all`}>View All</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/baseball`}>Baseball</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/basketball`}>Basketball</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/football`}>Football</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/hockey`}>Hockey</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/wrestling`}>Wrestling/Fighting</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/soccer`}>Soccer</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/racing`}>Racing</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/other`}>Other/Gaming</MenuItem> */}

export function MenuDropdown(props) {
    console.log(props.type)
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




  
  console.log(data.loggedIn)

    const useStyles = makeStyles((theme) => ({
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        float: 'right',
        marginRight: '3%'
          },
        button: {
          color: 'white',
          height: '4vh',
          position: 'relative',
          top: '0em',
          background: '#141518',
          border: '2px solid white',
          left: '30px',
        },
        logo: {
          maxWidth: 160,
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
        },
        search: {
          position: 'absolute',
          height: '2.9vh',
          float: 'right',
          borderRadius: theme.shape.borderRadius,
          border: '2px solid white',
          top: '0.5em',
          background: 'white'
        },
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        },
        inputRoot: {
          color: 'black',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        }
      }));

      const classes = useStyles()
      const [searchResults, setSearchResults] = React.useState([]);
      // const [saleSearch, setSaleSearch] = React.useState([]);
      const [hideDropdown, setHideDropdown] = React.useState(true);

    
      // const mouseEnterButton = (event) => {
      //   // setTimeout(() => {
      //     setOnButton(true);
      //     setOpen(true);
      //     setAnchor(event.currentTarget);
      //     console.log(event.target.id)
      //     setPageOption(event.target.id);


      //   // }, 300);
      // }
      // const mouseLeaveButton = () => {
      //   setTimeout(() => {
      //     setOnButton(false);
      //     setOpen(onMenu);
      //   }, 300);
      // }
      // const mouseEnterMenu = () => {
      //   // setTimeout(() => {
      //     setOnMenu(true);
      //     setOpen(true);
      //   // }, 300);
      // }
      // const mouseLeaveMenu = () => {
      //   setTimeout(() => {
      //     setOnMenu(false);
      //     setOpen(onButton);
      //   }, 300);
      // }

      // const launchModal = () => {

      // }

      const searchChange = (event) => {
        if(event.currentTarget.value == "") {
          setHideDropdown(true);
        }
        else {
          let token = localStorage.access_token;
          axios.get(`/api/search/${event.currentTarget.value}/${token}`)
          .then(res => {
              setSearchResults(res.data.results);
              console.log(res.data)
          })
          .catch(err =>  {
              console.log(err)

          })
          setHideDropdown(false);
        }
      }








      return (<div className="navbar-container">
        <AppBar position="fixed" style={{backgroundColor: '#141518'}}>
            <Toolbar>
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
                  </ul>
                </nav>
                <a href={`/`} className="navbar-img">
                  <img src="../logo.png" className={classes.logo} />
                </a>

              </div>


                    {/* <Button aria-owns={open ? 'simple-menu' : null} id="for_trade" aria-haspopup="true" href={`/for_trade/all`} onMouseEnter={mouseEnterButton} 
                                                            onMouseLeave={mouseLeaveButton}  className="nav-link" variant="h6">
                    For Trade
                    </Button>
                    <Button aria-owns={open ? 'simple-menu' : null} id="for_sale" aria-haspopup="true" href={`/for_sale/all`} onMouseEnter={mouseEnterButton} 
                                                            onMouseLeave={mouseLeaveButton} className="nav-link" variant="h6">
                    For Sale
                    </Button>
                    <Button aria-owns={open ? 'simple-menu' : null} id="wanted" aria-haspopup="true" href={`/wanted/all`}  onMouseEnter={mouseEnterButton} 
                                                            onMouseLeave={mouseLeaveButton}  className="nav-link" variant="h6">
                    Wanted
                    </Button>
                    <Button href={`/create_listing`} className="nav-link" variant="h6">
                    Create A Listing
                    </Button>
                    <Button className="nav-link" variant="h6">
                    About Us
                    </Button>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchor}
                  open={open}
                  MenuListProps={{
                    onMouseEnter: mouseEnterMenu,
                    onMouseLeave: mouseLeaveMenu,
                  }}
                  onMouseEnter={mouseEnterMenu} 
                                                            onMouseLeave={mouseLeaveMenu}
                >
                  <MenuItem component={Link} href={`/${pageOption}/all`}>View All</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/baseball`}>Baseball</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/basketball`}>Basketball</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/football`}>Football</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/hockey`}>Hockey</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/wrestling`}>Wrestling/Fighting</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/soccer`}>Soccer</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/racing`}>Racing</MenuItem>
                  <MenuItem component={Link} href={`/${pageOption}/other`}>Other/Gaming</MenuItem>

                </Menu> */}
                
                
                <div className="right-nav">
                  <div className="search-bar">
                <Paper component="form" className={classes.root}>
                    {/* <div className={classes.search}> */}
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

                            
                              <Paper className="dropdown-container">
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
                                              <ListItemText primary={res['player_name']} secondary={res['sport']} />
                                            <Divider />
                                            </ListItem>
                                              )}

                                </List>
                              </Paper>
                            {/* } */}

                            </div>

                    
                    </div>
                    </div>


                    
                  
                    {/* </div> */}

                    {!data.loggedIn && <Button value={true} className={classes.button} onClick={data.setModal} variant="outlined">Login</Button>}
                    {data.loggedIn && <Button value={true} className={classes.button} onClick={data.setModal} variant="outlined">Logout</Button>}


                </div>

                  
            </Toolbar>
            </AppBar>

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