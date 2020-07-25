import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function Redirect(props) {
    console.log(props);
    window.location = props.url;
    return (
    <div>
        <CircularProgress style={{position: 'absolute', top: '40vh'}} />

    </div>

    );

}