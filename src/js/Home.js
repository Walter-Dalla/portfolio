import React, { Component }  from 'react';

import "../mycss/home.css"
import sla from "../myimg/inicio.jpg"
import imgArrowDown from '../myimg/arrow-down.png'

import Escolaridade from "./Escolaridade";
import Trabalhos from './Trabalhos'
import ProjetosPessoais from "./ProjetosPessoais";
import Contato from './Contato';



export default class Home extends Component{

    constructor() {
        super();
        this.state = {
            projetosPessoais:{
                className: '',
                status: "hidden",
                titulo:""
            },
            trabalhos:{
                className: '',
                status: "hidden",
                titulo:""
            },
            escolaridade:{
                className: '',
                status: "hidden",
                titulo:""
            },
            contato:{
                className: '',
                status: "hidden",
                titulo:""
            },
            className:"typewriter",
            classNameArrow:"row arrow-down-div"
        }
    }

    handleScroll() { 
        let scrollTop = document.documentElement.scrollTop;
        
        const lenEscolaridade = 200;
        const lenArrow = 300;
        const lenTrabalhos = 1000;
        const lenProjetos = 2400;
        const lenContato = 2700;
        const state = this.state;
        console.log(scrollTop)
        
        if(scrollTop > lenArrow){
            this.setState({
                ...state,
                classNameArrow:"row arrow-down-div arrow-hidden"
            })
        }else{
            this.setState({
                ...state,
                classNameArrow:"row arrow-down-div"
            })
        }

        if (scrollTop > lenEscolaridade && scrollTop < lenTrabalhos && this.state.escolaridade.status != "show") {
            this.setState({
                ...state,
                escolaridade:{
                    status: "show",
                    className:this.state.className,
                    titulo:"C:\Walter\Dalla> dir ./Formações academicas:"
                }
            });
            console.log("academico");
        } 

        if (scrollTop > lenTrabalhos && scrollTop < lenProjetos && this.state.trabalhos.status != "show") {
            this.setState({
                ...state,
                trabalhos:{
                    status: "show",
                    className:this.state.className,
                    titulo:"C:\Walter\Dalla> dir ./Experiências:"
                }
            });
            console.log("trabalhou");
        } 

        if (scrollTop > lenProjetos  && this.state.projetosPessoais.status != "show") {
            this.setState({
                ...state,
                projetosPessoais:{
                    status: "show",
                    className:this.state.className,
                    titulo:"C:\Walter\Dalla> dir ./Projetos-pessoais:"
                }
            });
            console.log("Projetos");
        } 

        if (scrollTop > lenContato  && this.state.contato.status != "show") {
            this.setState({
                ...state,
                contato:{
                    status: "show",
                    className:this.state.className,
                    titulo:"C:\Walter\Dalla> dir ./Contato:"
                }
            });
            console.log("Contato");
        }
    }
    
    componentDidMount() {
        window.onscroll = () => this.handleScroll()
    }


    render(){
        return(
        <div className="home">
            <div className="img-home-div">
                <img src = {sla} className="img-home"></img>
            </div>
            <div className="no-colver-div typewriter-home">
                    <div className="programador">
                        <h1>Programador,</h1>
                    </div>
                    <div className="desenvolvedor">
                        <h1>Desenvolvedor,</h1>
                    </div>
                    <div className="e-comercial">
                        <h1>&</h1>
                    </div>
                    <div className="freelancer">
                        <h1>Freelancer.</h1>
                    </div>
            </div>
            <div className="container-fluid">
                <div className={this.state.classNameArrow}>
                    <div className="col-3"/>

                    <div className="col-3">
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                    </div>
                    
                    <div className="col-1" />

                    <div className="col-3">
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                        <div className="row arrow-down-img-div">
                            <img src={imgArrowDown} className="arrow-down"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="colver-div contato">
                <div className="row">
                    <div className="col-3">
                    </div>
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
                        </h2>
                    </div>
                </div>

            </div>
            <div className="escolaridade-div" id="escolaridade-div">
                <Escolaridade className={this.state.escolaridade.className} titulo={this.state.escolaridade.titulo}/>
            </div>

            <div className="trabalhos-div" id="trabalhos-div">
                <a id="trabalhos" ></a>
                <Trabalhos className={this.state.trabalhos.className} titulo={this.state.trabalhos.titulo}/>
            </div>

            <div className="projetos-pessoais-div" id="projetos-pessoais-div">
                <ProjetosPessoais className={this.state.projetosPessoais.className} titulo={this.state.projetosPessoais.titulo}/>
            </div>

            <div className="contato-div"  id="contato-div" >
                <Contato className={this.state.contato.className} titulo={this.state.contato.titulo}/>
            </div>
            
        </div>)
    }

}