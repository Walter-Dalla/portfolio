import React, { Component }  from 'react';

import NavBar from "./js/NavBar"
import Home from "./js/Home"

export default class IndexPage extends Component{

    render(){
        return(
        <div>
            <div className="nav-div">
                <NavBar/>
            </div>
            <div>
                <Home/>
            </div>
        </div>)
    }

}