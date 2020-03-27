import React, { Component }  from 'react';

import "../mycss/escolaridade.css"
import unicampLogo from "../myimg/unicampLogo.png"
import unespLogo from "../myimg/unespLogo.png"

export default class Escolaridade extends Component{

    

    render(){
        return(
        <div className="escolaridade" id="Formações-academicas">
            <div className="container">
                <div>
                    <div className="typewriter-div">
                        <div className={this.props.className}>
                            <h1 className="seccao-da-escolaridade">
                                {this.props.titulo}
                            </h1>
                        </div>
                    </div>

                    <div className="row row-info">

                        <div className="col-3 logo-div">
                            <img src={unicampLogo} className="escolaLogo"/>
                        </div>
                        <div className="col-8 info-div-unicamp">
                            <h2 className="titulo-info">
                                COTIL - UNICAMP
                                <br/>
                                Colégio Técnico de Limeira - Universidade Estadual de Campinas
                            </h2>
                            <p className="info">
                                Estudei no COTIL no período  de 2017 ~ 2019, lá cursei médio + técnico em informática.
                                <br/>
                                Durante esse período participei de iniciações científicas, aulas extra curriculares, ministrei aulas sobre Java Spring Boot.
                                <br/>
                                Para concluir o meu técnico, tive que realizar 600 horas de estágio e fazer um projeto de conclusão de curso (TCC).
                                <br/>
                                O COTIL é o colégio de ensino médio e técnico da UNICAMP, por isso possui a mesma qualidade da universidade.
                            </p>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-8 info-div-unesp">
                            <h2 className="titulo-info">
                                UNESP - Bauru
                                <br/>
                                Universidade Estadual de São Paulo - Bauru / SP
                            </h2>
                            <p className="info">
                                Entrei na UNESP em 2020 no curso de Bacharelado em Sistemas de Informação, com previsão de concluir em 2025.
                                <br/>
                                A grade de matérias incluem todos os aspectos do desenvolvimento e análise de sistemas de informação.
                                
                            </p>
                        </div>

                        <div className="col-4">
                            <img src={unespLogo} className="escolaLogo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

}