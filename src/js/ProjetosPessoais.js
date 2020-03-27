import React, { Component }  from 'react';

import "../mycss/projetosPessoais.css"
import GitHub from "../myimg/github.png"
import TCC from '../myimg/tcc.png'

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

                        <div className="col-3 logo-div-tcc">
                            <img src={TCC} className="escolaLogo"/>
                        </div>
                        <div className="col-8 info-div-projeto-par">
                            <h2 className="titulo-info">
                                Atom
                                <br/>
                                TCC do COTIL
                            </h2>
                            <div className="info">
                                <p>
                                    O intuito do TCC é fazer um sistema simples de cadastro para provar que o estudante está apto a trabalhar em empresas de software.
                                </p>
                                <p>
                                    Porém eu e meu grupo, constituído de 5 membros decidimos fazer algo mais complexo, por isso decidimos fazer um sistema de criação de formulários customizados (ou uma cópia do google forms/jetforms).
                                </p>
                                <p>
                                    O sistema foi finalizado em tempo, com backend separado do frontend, o backend foi feito em Java com Spring Boot e o frontend foi feito em React js. 
                                </p>
                                <p>
                                    No final o TCC recebeu a nota da banca, constituída de três professores que deram as notas 9,98, 9,5 e 9.
                                </p>
                                <p>
                                    O projeto: Atom também foi o primeiro projeto do COTIL hospedado no openstack da UNICAMP.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row row-info">
                        <div className="col-5 info-div-projeto-impar">
                            <h2 className="titulo-info">
                                Este portfolio
                            </h2>
                            <div className="info">
                                <p>
                                    Ele é uma forma tanto de mostrar meu trabalho quanto meu código!    
                                </p>
                                <p>
                                    Aqui mostro que sei criar um site esteticamente agradável e funcional.
                                </p>
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                        <div className="col-1 ">

                        </div>
                        <div className="col-6 meu-portfolio-div">
                            <div className={this.props.className + '-portfolio'}>
                                <p className="p-meu-portfolio-1">
                                    echo 'Este portfólio foi criado utilizando 
                                </p>
                                <p className="p-meu-portfolio-2">
                                    React js e produzido do zero!'
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row row-info">
                        <div className="col-3 logo-div-github">
                            <img src className="escolaLogo" src={GitHub}/>
                        </div>
                        <div className="col-8 info-div-projeto-par">
                            <h2 className="titulo-info">
                                GitHub
                                <br/>
                                Repositório de projetos
                            </h2>
                            <div className="info">
                                <p>
                                    GitHub é a maior plataforma de repositório de código publico e é lá que está todos os meus projetos públicos. 
                                </p>
                                <p>
                                    Isto é, todos os projetos desde o momento em que comecei a programar (repositórios antigos) até projetos mais recentes com tecnologias como:  
                                    <br/>
                                    Node js,
                                    <br/>
                                    Java com Spring boot,
                                    <br/>
                                    React js,
                                    <br/>
                                    E sites em geral.
                                </p>
                                <p>
                                    O código deste portfólio está publico a qualquer pessoa, <a href="https://github.com/Walter-Dalla/portfolio" target="blank"> clique aqui </a> e veja!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

}