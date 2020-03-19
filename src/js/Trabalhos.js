import React, { Component }  from 'react';

import "../mycss/trabalhos.css"
import unicampLogo from "../myimg/unicampLogo.png"
import unespLogo from "../myimg/unespLogo.png"

export default class Trabalhos extends Component{


    render(){
        return(
        <div className="trabalhos">
            <div className="container">
                <div>
                    <div className={this.props.className}>
                        <h1 className="seccao-de-trabalhos">
                            {this.props.titulo}
                        </h1>
                    </div>

                    <div className="row row-info">

                        <div className="col-3 logo-div">
                            <img src={unicampLogo} className="escolaLogo"/>
                        </div>
                        <div className="col-8 info-div-unicamp">
                            <h2 className="titulo-info">
                                Assertiva
                                <br/>
                                Empresa da area de software de campinas
                            </h2>
                            <p className="info">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

}