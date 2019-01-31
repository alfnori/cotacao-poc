import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {observer} from "mobx-react";

const PageShell = Page => {

    return observer(props =>

        <div className="page">
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionLeave={false}
                transitionEnter={false}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={150}
                transitionName={'SlideIn'}
            >
                <div className={'bubbles'}>
                    <Page {...props} />
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

export default PageShell;
