import React, { Component }  from 'react';

import "../mycss/trabalhos.css"
import javaLogo from "../myimg/java.png"

export default class Trabalhos extends Component{


    render(){
        return(
        <div className="trabalhos" id="Experiencia">
            <div className="container">
                <div>
                    <div className={this.props.className}>
                        <h1 className="seccao-de-trabalhos">
                            {this.props.titulo}
                        </h1>
                    </div>

                    <div className="row row-info">

                        <div className="col-3 logo-div">
                            <img src={javaLogo} className="escolaLogo"/>
                        </div>
                        <div className="col-8 info-div-trabalho-1">
                            <h2 className="titulo-info">
                                Assertiva
                                <br/>
                                Empresa da area de software de campinas
                            </h2>
                            <p className="info">
                                <p className="paragrafo-desc-trabalho">
                                    Fiz um estágio de 1 ano na empresa Assertiva:
                                </p>
                                <p className="paragrafo-desc-trabalho">
                                    7 meses no time de Análise e Desenvolvimento de Sistemas.
                                </p>
                                <p className="paragrafo-desc-trabalho">
                                    Desenvolvi nas linguagens:
                                    <br/>
                                    -> Java Spring Boot;
                                    <br/>
                                    -> Node js;
                                    <br/>
                                    -> Python;
                                </p>
                                <br/>
                                <p className="paragrafo-desc-trabalho">
                                    Lá tive contato com os métodos ágeis do:
                                    <br/>
                                    -> Scrum;
                                    <br/>
                                    -> Kambam;
                                </p>
                                <br/>
                                <p className="paragrafo-desc-trabalho">
                                    Fiz 3 meses de atendimento direto ao cliente:
                                    <br/>
                                    -> Atendimento telefone;
                                    <br/>
                                    -> Atendimento on-line;
                                </p>
                            </p>
                        </div>
                    </div>


                    <div className="row row-info">
                        <div className="col-8 info-div-trabalho-2">
                            <h2 className="titulo-info">
                                Freelancer
                                <br/>
                                Autônomo na área de TI
                                <br/>
                                Desenvolvimento de sites, sitemas, softwares e trabalhos em geral
                            </h2>
                            <div className="info">
                                <div className="paragrafo-desc-trabalho">
                                    Iniciei como freelancer autônomo no início de 2020.
                                </div>
                                <div className="paragrafo-desc-trabalho">
                                    Já foram vários projetos bem-sucedidos.
                                </div>
                                <div className="paragrafo-desc-trabalho">
                                    <p className="paragrafo-desc-trabalho-titulo">
                                        Desenvolvi nas linguagens:
                                    </p>
                                    -> Java Spring Boot;
                                    <br/>
                                    -> Node js;
                                    <br/>
                                    -> Python;
                                    <br/>
                                    -> React js;
                                    <br/>
                                    -> JavaScript;
                                    <br/>
                                    -> HTML e CSS;

                                </div>
                                <div className="paragrafo-desc-trabalho">
                                    <p className="paragrafo-desc-trabalho-titulo">
                                        Utilizo os métodos ágeis para me manter focado e organizado no decorrer do projeto:
                                    </p>
                                    -> Scrum;
                                    <br/>
                                    -> Kambam;
                                </div>
                                <div className="paragrafo-desc-trabalho">
                                    <p className="paragrafo-desc-trabalho-titulo">
                                        Trabalho com os seguintes focos:
                                    </p>
                                    -> Entregas constantes, isto é, sempre que uma parte do projeto estiver pronta eu mostro ao cliente para que ele dê sua opinião e aponte mudanças.
                                </div>
                            </div>
                        </div>
                        <div className="col-4 logo-div">
                            <img src={javaLogo} className="escolaLogo"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>)
    }

}