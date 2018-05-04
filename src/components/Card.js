import React, { Component } from 'react';
import Modal from 'react-modal';
import './Card.css'
import { BASE_URL } from '../constans';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
};

export default class Card extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
        };
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
        axios.get(BASE_URL + '/card/' + this.props.cardId, {}
        ).then((response) => {
            console.log(response);
            document.getElementById('description').value = response.data.description;
        });
    };

    afterOpenModal = () => {
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onDelete = () => {
        this.props.onDelete(this.props.cardId)
    }

    onSave = () => {
        axios.put(BASE_URL + '/card/',
            { Id: this.props.Id, Description: document.getElementById('description').value }
        ).then(() => {
            console.log("Card desc success")
        }).catch((error) => {
            console.log(error);
            window.alert("Error! Description has not been saved")
        });
        this.closeModal();
    }

    enableEditingDescription = () => {
        var textarea = document.getElementById ("description");
        textarea.readOnly = !textarea.readOnly;
    }

    render() {
        return (
            <div className="card__container">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2>{this.props.cardName}</h2>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea readOnly="readonly" className="form-control" rows="5" id="description"></textarea>
                        <button onClick={this.closeModal} className="btn btn-danger col-2">Cancel</button>
                        <button onClick={this.enableEditingDescription} className="btn btn-secondary">Edit</button>
                        <button onClick={this.onSave} className="btn btn-info">Save</button>
                    </div>
                </Modal>
                <div className="row">
                    <div onClick={this.openModal} className="col-10">{this.props.cardName}</div>
                    <button onClick={this.onDelete} className="btn btn-danger col-2">X</button>
                </div>
            </div>
        )
    }
}