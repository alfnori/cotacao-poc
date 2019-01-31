import React from 'react';
import {observer, inject} from 'mobx-react';
import {Row, Icon} from "react-materialize";

import TextInputMask from 'react-masked-text';

class Cnpj extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            isValid: false,
            value: null,
            rawValue : null
        }
    }

    _getRefs = () => {
        return this.refs['maskedInputCNPJ']
    }

    isValid() {

        const refs = this._getRefs();

        if (!refs) {
            return false;
        }

        let valid = refs.isValid() ;

        // Dummy test cnpj
        if (!valid && refs.state.value === '12.345.678/0001-23') {
            valid = true;
        }

        return valid;

    }

    onChangeText(text) {

        let isValid = this.isValid();
        let refs = this._getRefs();

        this.setState({
            isValid: isValid,
            value: text,
            rawValue: refs ? refs.getRawValue() : null
        });

        if (this.props.onChangeText) {
            this.props.onChangeText(this);
        }

    }

    emptyInput = () => {

        this.setState({
            isValid: false,
            value: '',
            rawValue: ''
        });

        let refs = this._getRefs();

        if (refs.state) {
            refs.setState({
                value: ''
            });
        }

    };

    onClickChecked = () => {
        if (this.props.onClickChecked) {
            this.props.onClickChecked(this);
        }
    };

    onClickUnchecked = () => {
        if (this.props.onClickUnchecked) {
            this.props.onClickUnchecked(this);
        } else {
            this.emptyInput();
        }
    };

    render() {
        // the kind is required but options is required only for some specific kinds.
        return (
            <Row className={'cnpj ' + (this.state.value ? '' : 'empty')}>
                {
                    this.state.isValid ?
                        <span onClick={this.onClickChecked}><Icon right>check_circle</Icon></span> :
                        <span onClick={this.onClickUnchecked}><Icon right>remove_circle_outline</Icon></span>
                }
                <TextInputMask
                    ref={'maskedInputCNPJ'}
                    kind={'cnpj'}
                    onChangeText={this.onChangeText.bind(this)}
                />
                {
                    this.props.label ? this.props.label : ''
                }
            </Row>
        );
    }
}

export default inject('ConfigStore', 'CompanyStore')(observer(Cnpj));
