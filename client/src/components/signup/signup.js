import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';



class Signup extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {email: 'username' in props ? props.username : "", password: "", setUserInfo: props.setUserInfo, 
                        redirectUrl: 'redirectUrl' in props ? props.redirectUrl : ""}
        console.log(this.state)
        this.setToken = false;
    }

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0;
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
            <div className="Signup">
                {"error" in this.state &&
                    <p>{this.state["error"]}</p>
                }
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                    <p>Email or Username</p>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state['email']}
                        onChange={e => this.setState({...this.state.password, email: e.target.value})}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                    <p>Password</p>
                    <FormControl
                        value={this.state['password']}
                        onChange={e => this.setState({...this.state.email, password: e.target.value})}
                        type="password"
                    />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                    Login
                    </Button>
                </form>
                </div>



        );

    }

}
export default Signup;