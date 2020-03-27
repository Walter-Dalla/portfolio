import React, { Component }  from 'react';

import "../mycss/contato.css"

export default class Contato extends Component{

    

    render(){
        return(
        <div className="contato">
            <div className="container">
                <div>
                    <div className={this.props.className}>
                        <h1 className="seccao-de-contato">
                            {this.props.titulo}
                        </h1>
                    </div>
                    <div className="row">

                        <div className="col-8 info-div-unesp">
                            <h2 className="contato-info">
                                <div className="row">
                                    <div className="col-1">
                                        <div className="contato-icons">
                                            <i class="fab fa-whatsapp" />
                                        </div>
                                    </div>
                                    <div className="col-11">
                                        (19) 9-9469-1881
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="far fa-envelope"></i>
                                    </div>
                                    <div className="col-11">
                                        walterdallaprofissional@gmail.com
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fab fa-linkedin"></i>
                                    </div>
                                    <div className="col-11">
                                        <a href="https://www.linkedin.com/in/walter-dalla-torre-neto-a1421b15a/" target="blank">
                                            Walter Dalla Torre Neto
                                        </a>
                                    </div>
                                </div>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

}