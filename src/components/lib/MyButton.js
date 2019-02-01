import React, {Component} from 'react';
import {Icon} from "react-materialize";

export default class myButton extends Component {

    handleButton(e) {
        this.props.onClick(e);
    };

    defaultButton = () => {
        return <Icon>help_outline</Icon>;
    };

    render() {

        let icon = this.props.icon ? this.props.icon : this.defaultButton();

        return (
            <span className={"my-button " + this.props.span} onClick={this.handleButton.bind(this)}>{icon}</span>
        )
    }
}

