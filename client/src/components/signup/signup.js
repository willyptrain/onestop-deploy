import React, { Component } from 'react';
import {FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
// import { Box } from 'grommet';
import Particles from 'react-particles-js';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import './signup.css'
import logo from '../../images/logo_transparent.png';


class Signup extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {email: "", password: "", username: "", setUserInfo: props.setUserInfo, 
                        redirectUrl: 'redirectUrl' in props ? props.redirectUrl : ""}
        console.log(this.state)
        this.setToken = false;
    }

    validateForm() {
        return this.state['email'].length > 0 && this.state['username'].length > 0 && this.state['password'].length > 0;
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/users/signup", {
            method:"POST",
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).then(response => 
            response.json()
        ).then(res => {
            localStorage.setItem('access_token', res.access_token)
            this.setState({'redirectUrl':res.redirectUrl, 'token':true})
            
        }).catch(err => {
            console.log(err);
            this.setState({'error': err})
        });
    

        
    }

    render() {

        if (this.state.token) {
            return <Redirect url={`/`} />
          }

        return (
            <div className="signup-container">
                <Particles  style={{position: 'absolute', left:'0px',backgroundSize: 'cover', width:'100%', height:'100%'}}
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
                    /> 

                <div className="signup-box">


                <Grid container className="grid-container"
          alignItems="center"
          justify="center" spacing={0}>
          <Grid style={{marginTop:'20vh'}} item xs={10} sm={10} md={10} lg={8}>

                      <Paper elevation="large" className="signup-card">
                        <div className="signup-left">
                            <div className="signup-header">
                            <img src={logo} className="logged-in-logo" />
                            </div>
                            <div>
                                <h4 className="have-account-text">Already have an account?</h4>
                                <Button href={'/'} variant="outlined" className="have-account-login-btn">Login</Button>
                            </div>
                        </div>
                        <div className="signup-right">
                            {"error" in this.state &&
                                <p>{this.state["error"]}</p>
                            }
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="username" bsSize="large">
                                <p>Username</p>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state['username']}
                                    onChange={e => this.setState({...this.state, username: e.target.value})}
                                />
                                </FormGroup>

                                <FormGroup controlId="email" bsSize="large">
                                <p>Email</p>
                                <FormControl
                                    value={this.state['email']}
                                    onChange={e => this.setState({...this.state, email: e.target.value})}
                                    type="text"
                                />
                                </FormGroup>

                                <FormGroup controlId="password" bsSize="large">
                                <p>Password</p>
                                <FormControl
                                    value={this.state['password']}
                                    onChange={e => this.setState({...this.state, password: e.target.value})}
                                    type="password"
                                />
                                </FormGroup>
                                <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                                Signup
                                </Button>
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