import React, { Component }  from 'react';

import NavBar from "./js/NavBar"
import Home from "./js/Home"

export default class IndexPage extends Component{

    render(){
        return(
        <div className="container-fluidd">
            <div className="nav-div">
                <NavBar/>
            </div>
            <div className="home-full">
                <Home/>
            </div>
        </div>)
    }

}