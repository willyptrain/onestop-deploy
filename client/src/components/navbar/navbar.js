import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Redirect from '../redirect.js';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import './navStyle.css';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
// import {logo} from '../../images/logo.png';


export function NavBar(data) {
    const useStyles = makeStyles((theme) => ({
        button: {
            color: 'white',
            background: '#3c3c3c'
        },
        logo: {
          maxWidth: 160,
        },
        search: {
          position: 'relative',
          float: 'left',
          borderRadius: theme.shape.borderRadius,
          border: '2px solid black'
        },
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black'
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
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      }));

      const classes = useStyles()
      const [open, setOpen] = React.useState(false);
      const [onButton, setOnButton] = React.useState(false);
      const [onMenu, setOnMenu] = React.useState(false);
      const [pageOption, setPageOption] = React.useState("all");
      const [anchor, setAnchor] = React.useState(null);
    
      const mouseEnterButton = (event) => {
        // setTimeout(() => {
          setOnButton(true);
          setOpen(true);
          setAnchor(event.currentTarget);
          console.log(event.target.id)
          setPageOption(event.target.id);


        // }, 300);
      }
      const mouseLeaveButton = () => {
        setTimeout(() => {
          setOnButton(false);
          setOpen(onMenu);
        }, 300);
      }
      const mouseEnterMenu = () => {
        // setTimeout(() => {
          setOnMenu(true);
          setOpen(true);
        // }, 300);
      }
      const mouseLeaveMenu = () => {
        setTimeout(() => {
          setOnMenu(false);
          setOpen(onButton);
        }, 300);
      }


      return (<div className="navbar-container">
        <AppBar position="static" style={{backgroundColor: 'white'}}>
            <Toolbar>
                <div className="left-nav">
                <img src="./logo.png" className={classes.logo} />
                    <Button aria-owns={open ? 'simple-menu' : null} id="for_trade" aria-haspopup="true" href={`/for_trade/all`} onMouseEnter={mouseEnterButton} 
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

                </Menu>
                
                
                <div className="right-nav">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                            <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {!data.loggedIn && <Button className={classes.button} variant="contained">Login</Button>}
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