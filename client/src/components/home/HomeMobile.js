import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../images/old_logo_transparent.png';


export default function HomeMobile(data) {


    return (<div className="home-container" style={{overflow: 'hidden', height: '100vh', marginTop: '0vh'}}>

        <div style={{width: '100%', overflow: 'hidden'}}>
            <img style={{height: '100vh', opacity: '0.7'}} src="https://images.unsplash.com/photo-1554356871-631f150c6c22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div style={{position: 'absolute', top: '5vh',width: '90%', marginLeft: '5%', marginRight: '5%'}}>
            
            <img src={logo} style={{height: '12vh'}} />
            <Typography className="mont-text" textAlign="center"
                variant="h4" style={{color: 'white', marginTop: '4vh'}}>
                    <b>For all of your card trading needs. <br></br> We insure
                    all of <br></br> your trades <br></br> and sales!</b>
            </Typography>
            <Button className="mont-text" href="/for_trade/all" style={{width: '80%', background: 'white', marginTop: '6em', height: '6vh'}}><b>View Trades</b></Button>
            <Button className="mont-text" href="/for_sale/all" style={{width: '80%', background: 'white', marginTop: '2vh', height: '6vh'}}><b>View Sales</b></Button>

        </div>
    </div>)

}