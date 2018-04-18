import React, { Component } from 'react';
import './Card.css'

export default class Card extends Component {


    render() {
        return(
            this.newMethod(),
            <div className="card__container">{this.props.cardName}</div>
        )
    }

    newMethod() {
        return <button className="btn btn-warning btn-sm">Card</button>;
    }
}