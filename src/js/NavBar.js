import React, { Component }  from 'react';

import "../mycss/navBar.css"

export default class NavBar extends Component{

    render(){
        return(
        <div className="my-nav-full-div">
            <nav className="navbar navbar-expand-lg navbar-dark bd-navbar my-nav-div" >
                <div className="mycss-nav-logo col-5">
                    <a className="navbar-brand" href="#">Walter Dalla</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse mycss-nav-options col-4" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">
                            (current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#escolaridade-div">Formações</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#trabalhos-div">Experiencia</a>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link" href="#projetos-pessoais-div">Projetos</a>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link" href="#contato-div">Contato</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Login</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>)
    }

}