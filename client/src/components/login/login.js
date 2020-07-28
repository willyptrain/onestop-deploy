import React, { Component } from 'react';
import {FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import './login.css'
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", setUserInfo: props.setUserInfo}
    }

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0;
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/users/login", {
            'email':this.state['email'],
            'password':this.state['password']
        }).then(res => {
            console.log(res);
            localStorage.setItem('access_token', res.data.access_token)
            this.setState({'redirectUrl':res.data.redirectUrl, 'token':true})
        }).catch(err => {
            console.log(err)
            this.setState({email: "", password: "",'error':err})
        });
    

        
    }

    render() {

        if (this.state.token) {
            return <Redirect url={this.state.redirectUrl} />
          }
        return (
                <div className="login">
                    <Card className="login-card">
                        <div className="login-form">
                        <img src="./logo.png" style={{maxWidth: 160, marginTop: '2vh'}} />
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                            <p style={{fontWeight: '600'}}>Welcome Back!</p>
                            <TextField error={"error" in this.state} id="standard-basic" label="Email" className="textbox-generic login-email"
                                autoFocus
                                type="text"
                                value={this.state['email']}
                                onChange={e => this.setState({...this.state.password, email: e.target.value})}
                            />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                            <TextField error={"error" in this.state} id="standard-basic" label="Password" className="textbox-generic login-password"
                                value={this.state['password']}
                                onChange={e => this.setState({...this.state.email, password: e.target.value})}
                                type="password"
                            />
                            </FormGroup>
                            {/* {"error" in this.state &&
                                <div>
                                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                                <Alert className="login-alert" variant="filled" severity="error">Error loggin in</Alert>
                                </Box>
                                </div>
                                } */}
                            <Button className="login-btn" variant="contained" color="primary" disabled={!this.validateForm()} type="submit">
                            Login
                            </Button>
                        </form>
                        </div>
                        
                    </Card>
                </div>

        );

    }

}
export default Login;