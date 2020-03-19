import React, { Component }  from 'react';

import "../mycss/home.css"
import sla from "../myimg/inicio.jpg"

import Escolaridade from "./Escolaridade";
import Trabalhos from './Trabalhos'
import ProjetosPessoais from "./ProjetosPessoais";

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
            }
        }
    }

    handleScroll() { 
        let scrollTop = document.documentElement.scrollTop;
        
        let lenEscolaridade = 0;
        let lenTrabalhos = 0;
        let lenProjetos = 0;

        if (scrollTop > lenEscolaridade && scrollTop < lenTrabalhos && this.state.status != "show") {
            this.setState({
                escolaridade:{
                    status: "show",
                    className:"typewriter",
                    titulo:"C:\Walter\Dalla> dir ./Formações academicas:"
                }
            });
        } 

        if (scrollTop > lenTrabalhos && scrollTop < lenProjetos && this.state.status != "show") {
            this.setState({
                trabalhos:{
                    status: "show",
                    className:"typewriter",
                    titulo:"C:\Walter\Dalla> dir ./Aonde trabalhou:"
                }
            });
        } 

        if (scrollTop > lenProjetos  && this.state.status != "show") {
            this.setState({
                projetosPessoais:{
                    status: "show",
                    className:"typewriter",
                    titulo:"C:\Walter\Dalla> dir ./projetos-pessoais:"
                }
            });
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
            <div className="no-colver-div typewriter">
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
            <div className="colver-div">

            </div>
            <div className="escolaridade-div">
                <a id="escolaridade" ></a>
                <Escolaridade className={this.state.escolaridade.className} titulo={this.state.escolaridade.titulo}/>
            </div>

            <div className="trabalhos-div">
                <a id="trabalhos" ></a>
                <Trabalhos className={this.state.trabalhos.className} titulo={this.state.trabalhos.titulo}/>
            </div>

            <div className="projetos-pessoais-div">
                <a id="projetos-pessoais" ></a>
                <ProjetosPessoais className={this.state.projetosPessoais.className} titulo={this.state.projetosPessoais.titulo}/>
            </div>

            
        </div>)
    }

}