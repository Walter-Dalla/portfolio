import React, { Component }  from 'react';

import "../mycss/projetosPessoais.css"

export default class ProjetosPessoais extends Component{

    constructor(props) {
        super(props);
        this.state = {
            className: '',
            status: "hidden",
            style:{},
            titulo:""
        }
    }

    render(){
        return(
        <div className="projetos-pessoais">
            <div className="container">
                <div>
                    <div className={this.props.className}>
                        <h1 className="seccao-da-projetos-pessoais">
                            {this.props.titulo}
                        </h1>
                    </div>

                    <div className="row row-info">

                        <div className="col-3 logo-div">
                            <img src className="escolaLogo"/>
                        </div>
                        <div className="col-8 info-div-unicamp">
                            <h2 className="titulo-info">
                                Atom
                                <br/>
                                TCC do COTIL
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