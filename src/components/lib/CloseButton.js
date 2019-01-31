import React, {Component} from 'react';

import iconClose from '../../images/ic-close-window.svg';

export default class CloseButton extends Component {

    handleClose(e) {
        this.props.onClick(e);
    }

    render() {
        return (
            <span className="close-button" onClick={this.handleClose.bind(this)}><img src={iconClose} alt=""/></span>
        )
    }
}

