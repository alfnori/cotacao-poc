import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

import {Button, Icon, Section, Label} from "react-materialize";
import UserPicture from '../components/lib/UserPicture';

import '../stylesheets/Quotation.scss';
import chart from "../images/line-chart.svg";
import Cnpj from "./lib/Cnpj";

class Quotation extends Component {

    constructor (props) {

        super(props);

        this.state = {
            cnpjValid: false,
            cnpj: '',
            loading: false,
            company : null
        }
    }

    avatarClick = () => {
        this.props.ConfigStore.openMenu();
    };

    handleClick = (e) => {
        if (this.state.cnpjValid) {
            this.props.CompanyStore.searchOne({cnpj: this.state.cnpj});
        } else {
            e.stopImmediatePropagation();
        }
    };

    onChangeText = (ic) => {
        if (ic.state && ic.state.isValid) {
            this.setState({
                cnpjValid: true,
                cnpj: ic.state.value
            });
        } else {
            this.setState({
                cnpjValid: false,
                cnpj: ''
            });
        }
    };

    render() {

        return (

            <Section className="Quotation">

                <header className="Quotation-header">

                    <div className={'mixer'}>
                        <Section className={'chart'}>
                            <img src={chart} className="Quotation-chart" alt="Cotação" />
                        </Section>
                        <Section className={'describe'}>
                            <h3>Nova cotação</h3>
                            <p>#0980</p>
                        </Section>
                        <Section className={'menu'}>
                            <UserPicture onClick={this.avatarClick}/>
                        </Section>
                    </div>

                </header>

                <Section className={"search"}>
                    <Section className={"describe"}>
                        <span><Icon style={'outline'}>filter_1</Icon>Buscar por CNPJ ou empresa</span>
                    </Section>
                    <Section className={'input'}>
                        <p>CNPJ / Empresa</p>
                        <Cnpj onChangeText={this.onChangeText}/>
                    </Section>
                </Section>

                <Section className={'proceed'}>
                    <Button waves='light'
                        disabled={!this.state.cnpjValid} flat={true}
                        floating={true} className="go"
                        onClick={this.handleClick.bind(this)}>OK
                        <Icon right>arrow_forward</Icon>
                    </Button>
                </Section>


            </Section>

        );
    }
}

const Quotationx = observer(Quotation);
export default inject('ConfigStore', 'CompanyStore')(Quotationx);