import React, { Component } from 'react';

import * as $AB from 'jquery';
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';

import {Button, Icon, Section, Modal, Table} from "react-materialize";
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
            company : {}
        }
    }

    avatarClick = () => {
        this.props.ConfigStore.openMenu();
    };

    openModal = () => {
        window.jQuery("#DummyCompany").modal('open');
        // document.getElementById("#DummyCompany").modal('open');
    };

    handleClick = (e) => {
        if (this.state.cnpjValid) {
            let instance = this;
            this.props.CompanyStore.searchOne({cnpj: this.state.cnpj})
                .then( (data) => {
                    if (data && data.id) {
                        this.setState({
                            company: data
                        });
                        setTimeout(() => {
                            instance.openModal();
                        }, 200);

                    }
                });
        } else {
            e.stopImmediatePropagation();
        }
    };

    onChangeText = (ic) => {
        this.setState({
            cnpjValid: ic.state && ic.state.isValid,
            cnpj: ic.state.value,
            company: {}
        });
    };

    render() {

        let divStyle = {
            'display' : 'none'
        }

        return (

            <Section className="Quotation">

                <header className="Quotation-header">

                    <div className={'mixer'}>
                        <Section className={'chart'} onClick={ () => {
                           this.props.history.push('/') ;
                        }}>
                            <img src={chart} className="Quotation-chart" alt="Cotação" />
                        </Section>
                        <Section className={'describe'}>
                            <h3>Nova cotação</h3>
                            <p>#0980</p>
                        </Section>
                        <Section className={'menu'}>
                            <UserPicture user={this.props.AuthStore.user} onClick={this.avatarClick.bind(this)}/>
                        </Section>
                    </div>

                </header>

                <Section className={"search"}>
                    <Section className={"describe"}>
                        <span><Icon>filter_1</Icon>Buscar por CNPJ ou empresa</span>
                    </Section>
                    <Section className={'input'}>
                        <p>CNPJ / Empresa</p>
                        <Cnpj onChangeText={this.onChangeText}/>
                    </Section>
                </Section>

                <Section className={'proceed'}>
                    <Button waves='light'
                        disabled={!this.state.cnpjValid}
                        floating={true} className="go"
                        onClick={this.handleClick.bind(this)}>OK
                        <Icon right>arrow_forward</Icon>
                    </Button>
                </Section>

                <Modal
                    id='DummyCompany'
                    header='Dados da empresa'
                >
                    {
                        this.state.company && this.state.company.id ?
                            <Table>
                                <thead>
                                <tr>
                                    <th data-field="id">ID</th>
                                    <th data-field="name">Nome</th>
                                    <th data-field="cnpj">CNPJ</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>{this.state.company.id}</td>
                                    <td>{this.state.company.name}</td>
                                    <td>{this.state.company.cnpj}</td>
                                </tr>
                                </tbody>
                            </Table> : <span>dummy</span>
                    }
                </Modal>

            </Section>

        );
    }
}

const Quotationx = observer(Quotation);
export default withRouter(inject('ConfigStore', 'CompanyStore', 'AuthStore')(Quotationx));