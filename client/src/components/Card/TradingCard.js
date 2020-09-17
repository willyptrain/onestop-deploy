import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class TradingCard extends Component {

    constructor(props) {
        super(props);
        this.state = {...props};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });  
      }

    render() {
        
        if(this.state['trade']) {
            return (
                <div>
                    <Card className="track-card">                          
                            <CardActionArea onClick={() => window.location = `/${this.state['url']}/${this.state['trade']['id']}`}>
                                        <CardHeader 
                                            title={this.state['trade']['player_name']}
                                            subheader={this.state['trade']['username']}
                                        />
                                        <CardMedia className="track-img" image={this.state['trade']['img_paths'][0]}></CardMedia>
                                        <CardContent>
                                        <Typography variant="h6" color="textSecondary" component="p">
                                            {this.state['trade']['year']+ " " + this.state['trade']['manufacturer'] + " " + this.state['trade']['cardSeries'] + " " + this.state['trade']['player_name']}
                                        </Typography>

                                        </CardContent>
                            </CardActionArea>
                                        { this.state['edit'] && 
                                        <div>
                                            <IconButton style={{float:'left'}} id={this.state['trade']['id']} onClick={() => window.location = `/create_listing/edit/trade/${this.state['trade']['id']}`} aria-label="add to favorites">
                                                    <EditIcon />
                                            </IconButton>   
                                        </div>
                                        }
                                        {this.state['favorite'] && 
                                        
                                        <CardActions disableSpacing>
                                            <IconButton value={this.state['trade']['id']} color={this.state['favorite_trades'].includes(this.state['trade']['id']) ? "primary" : "default"} onClick={this.state['favorite_func']} aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>   
                                            { this.state['statusText'] && 
                                        
                                                <Typography align="right" style={{color: !this.state['trade'].for_trade ? 'green' : 'black'}} className="mont-text ">
                                                    <b>{this.state['trade'].for_trade ? "For Trade" : "Traded"}</b>
                                                </Typography>
                                            
                                            }
                                        </CardActions>

                                        }


                                       
                            </Card>
                </div>);
        } else {
            return (<div>

            </div>);
        }
    }
}

export default TradingCard;