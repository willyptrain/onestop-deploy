import React from 'react';



export default function Redirect(props) {
    console.log(props);
    window.location = props.url;
    return (
    <div>
        <h2>
            Loading...
        </h2>

    </div>

    );

}