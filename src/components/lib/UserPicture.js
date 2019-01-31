import React, {Component} from 'react';
import {observer, inject} from 'mobx-react'

import '../../stylesheets/UserPicture.scss'
import dummy from '../../images/dummyAvatar.jpeg';

import {decorate} from "mobx";

import ConfigStore from "../../stores/ConfigStore";

export default class UserPicture extends Component {

    constructor (props) {
        super(props);

        this.state = {
            loadingImage: false,
            profileImageLoaded: null,
            avatar : '',
            onClick: null
        }
    }

    handleClick(e) {
        console.log(this.props);
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {

        const {disabled} = this.props;

        let userImage = (this.state.profileImageLoaded) ? this.state.profileImageLoaded : this.props.avatar;

        if (!userImage) {
            userImage = dummy;
        }

        let divStyle = {
            backgroundImage: 'url(' + userImage + ')'
        };

        return(

            <div className={"UserPicture " + (disabled ? 'disabled' : '')}>
                <canvas ref={c => this.canvas = c} style={{visibility: 'hidden', position: 'absolute', width:0, height:0}}/>
                <div className="picture-container" style={divStyle} onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}

decorate(UserPicture, {
    this: observer
});

decorate(ConfigStore, {
    this : inject
});

decorate(Navigator, {
    this : inject
});