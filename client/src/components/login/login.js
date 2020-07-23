import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import './login.css'
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';


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
        fetch("/api/users/login", {
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
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                            <p>Email or Username</p>
                            <InputBase className="textbox-generic login-email"
                                autoFocus
                                type="text"
                                value={this.state['email']}
                                placeholder="Email"
                                onChange={e => this.setState({...this.state.password, email: e.target.value})}
                            />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                            <p>Password</p>
                            <InputBase className="textbox-generic login-email"
                                autoFocus
                                value={this.state['password']}
                                onChange={e => this.setState({...this.state.email, password: e.target.value})}
                                type="password"
                                placeholder="Password"
                            />
                            </FormGroup>
                            <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                            Login
                            </Button>
                        </form>
                        {"error" in this.state &&
                        <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                           <Alert className="login-alert" variant="filled" severity="error">Error loggin in</Alert>
                        </Box>
                        }
                    </Card>
                </div>

        );

    }

}
export default Login;