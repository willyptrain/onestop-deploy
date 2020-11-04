import React, { Component } from 'react';
import {FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
// import { Box } from 'grommet';
import Particles from 'react-particles-js';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import './signup.css'
import logo from '../../images/old_logo.png';
// import logo from '../../images/text_logo.png';
import Tooltip from '@material-ui/core/Tooltip';

import FormData from 'form-data';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", setUserInfo: props.setUserInfo, 
                        redirectUrl: 'redirectUrl' in props ? props.redirectUrl : ""}
        this.setToken = false;
    }

    validateForm() {
        return true;//this.state['email'].length > 0 && this.state['email'].includes("@") && this.state['password'].length > 8;
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        let form_data = new FormData();
        form_data.append('username', this.state['email'])
        form_data.append('email', this.state['email'])
        form_data.append('password', this.state['password'])

        axios.post('/api/users/signup', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then(res => {
                
                localStorage.setItem('access_token', res.data.access_token);
                this.setState({...this.state, 'redirectUrl':res.data.redirectUrl, 'token':true})

            })
            .catch(err =>  {
                this.setState({...this.state, 'error':err,'userInfo': 'Not logged in'})

            })
        
    }

    render() {

        if (this.state['token']) {
            console.log(this.state.token);
            return <Redirect url={`/`} />
          }
        // if(this.state['error']) {
        //     return <p>Error!!</p>
        // }

        return (
            <div className="signup-container">
                {/* <Particles  style={{position: 'absolute', left:'0px',backgroundSize: 'cover', width:'100%', height:'100%'}}
                    params={{ 
                        particles: { 
                        number: { 
                            value: 60,
                            density: { 
                            enable: true, 
                            value_area: 800,
                            } 
                        }, 
                        }, 
                    }} 
                    />  */}
                    <div style={{position: 'absolute', left:'0px', width:'100%', height:'100%'}}>
                        <img style={{opacity: '0.7',position: 'absolute', left:'0px',backgroundSize: 'cover', width:'100%', height:'100%'}} 
                        src="https://images.pexels.com/photos/139762/pexels-photo-139762.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                    </div>

                <div className="signup-box">


                <Grid container className="grid-container"
          alignItems="center"
          justify="center" spacing={0}>
          <Grid style={{marginTop:'10vh', zIndex: '100'}} item xs={10} sm={4} md={4} lg={4}>

                      <Paper elevation="large" className="signup-card">
                        {/* <div className="signup-left">
                            <div className="signup-header">
                            <img src={logo} className="logged-in-logo" />
                            </div>
                            <div>
                                <h4 className="have-account-text">Already have an account?</h4>
                                <Button href={'/'} variant="outlined" className="have-account-login-btn">Login</Button>
                            </div>
                        </div> */}
                        <div className="signup-right">
                            
                            <img src={logo} style={{maxWidth: 160, marginTop: '2vh'}} />
                            <form onSubmit={this.handleSubmit}>
                                
                                <FormGroup style={{marginTop: '2vh'}} controlId="email" bsSize="large">
                                {/* <p>Email</p> */}
                                <TextField error={"error" in this.state} id="standard-basic" label="Email" className="textbox-generic login-email"
                                    type="text"
                                    value={this.state['email']}
                                    onChange={e => this.setState({...this.state, email: e.target.value})}
                                />
                                </FormGroup>

                                <FormGroup style={{marginTop: '3vh'}} controlId="password" bsSize="large">
                                {/* <p>Password</p> */}
                                <TextField error={"error" in this.state} id="standard-basic" label="Password" className="textbox-generic login-email"
                                    value={this.state['password']}
                                    onChange={e => this.setState({...this.state, password: e.target.value})}
                                    type="password"
                                />
                                </FormGroup>
                                {'error' in this.state && 
                                    <div style={{width: '100%'}}>
                                        <p className="mont-text" style={{fontSize: '0.53em'}}>Email is already taken or Invalid Input</p>
                                    </div>
                                }
                                
                                <div style={{width: '100%', marginTop: '3vh'}}>
                                {!this.validateForm() && 
                                    <div>
                                        <Tooltip placement="top" title={"Please use a valid email and ensure password length > 7."}>
                                        <div>
                                        <Button className="signup-btn" block bsSize="large" color="primary" variant="contained" disabled={!this.validateForm()} type="submit">
                                            Signup
                                        </Button>
                                        </div>
                                        </Tooltip>
                                    
                                    </div>
                                }
                                {this.validateForm() && 
                                    <Button className="signup-btn" block bsSize="large" color="primary" variant="contained" disabled={!this.validateForm()} type="submit">
                                    Signup
                                    </Button>
                                    }
                                </div>
                                <div style={{width: '100%', marginBottom: '3vh'}}>
                                    <a style={{fontSize: '0.55em'}} href="https://cardshop-client.herokuapp.com/">
                                    Already Signed up? Login here
                                    </a>
                                </div>
                            </form>
                        </div>


              
            </Paper>
            </Grid>
            </Grid>














                    
                </div>




            </div>
            



        );

    }

}
export default Signup;