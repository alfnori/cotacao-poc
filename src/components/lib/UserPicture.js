import React, {Component} from 'react';
import '../../stylesheets/UserPicture.scss'
import dummyAv from '../../images/dummyAvatar.jpg';

export default class UserPicture extends Component {

    handleClick(e) {
        e.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {

        const {disabled, user} = this.props;

        let userImage = user && user.avatar ? user.avatar : dummyAv;

        let divStyle = {
            backgroundImage: 'url(' + userImage + ')'
        };

        return(

            <div className={"UserPicture " + (disabled ? 'disabled' : '')}>
                <div className="picture-container" style={divStyle} onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}