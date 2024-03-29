import React, { Component } from 'react';

import '../stylesheets/Home.scss';
import chart from '../images/line-chart.svg';
import {withRouter} from 'react-router-dom';

import {Button, Icon, Section} from "react-materialize";
import {inject, observer} from "mobx-react";

class Home extends Component {

    gotoQuotation = () => {
        this.props.AuthStore.doFakeLogin();
        this.props.history.push('/quotation');
    };

    render() {
        return (

            <Section className="Home">

                <header className="Home-header">
                    <img src={chart} className="Home-chart" alt="Cotação" />
                    <h3>Cotação de seguros</h3>
                    <p>Solução inovadora da líder de mercado</p>
                </header>

                <Section className={'proceed'}>
                    <Button waves='teal' floating={true}
                        className="go"
                        onClick={this.gotoQuotation}>
                        Iniciar<Icon right>arrow_forward</Icon>
                    </Button>
                </Section>

            </Section>

        );
    }
}

const Homex = (observer(Home));
export default withRouter(inject('ConfigStore', 'AuthStore')(Homex));