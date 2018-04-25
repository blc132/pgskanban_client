import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card'; //import card
import './List.css';
import { BASE_URL } from '../constans';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.listId,
            name: props.listName,
            cards: props.cards,
            cardName: [],
            newCardName: ''
        };
    }

    renderCards = () => {
        return (
            this.props.cards.map((card) => <Card cardName={card.name} />)
        );
    }

    addCard = (e) => {
        axios.post(BASE_URL + '/card', { Name: this.state.cardName, ListId: this.props.id }
        ).then((res) => {
            this.setState(prevState => {
                return {
                    cards: [...prevState.cards, { listId: this.props.listId, name: this.state.cardName}],
                    newCardName: ''
                }
            })
            console.log("Successfully updated card!")
        }).catch((error) => {
            console.log(this.state.cardName);
            console.log(this.state.id);
            console.log(error);
        });


    }

    onCardNameChange = e => {
        console.log(this.state.cardName);
        this.setState({ newCardName: e.target.value });
    }

    onListNameChange = e => {
        this.setState({ name: e.target.value });
    }

    saveListName = () => {
        axios.put(BASE_URL + '/list', { name: this.state.name, boardId: this.props.boardId, listId: this.props.id }
        ).then(() => {
            console.log("Successfully updated list!")
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteList = () => {
        console.log("board id: " + this.state.boardId + "list name: " +  this.state.listName + "list id: " +  this.state.listId)
        axios.delete(BASE_URL + "/list", { boardId: this.state.boardId, Name: this.state.listName, listId: this.state.listId })
            .then(response => {
                console.log(response);
                this.setState(prevState => {
                    return {
                        //te trzy kropki to taki operator ktory wezmie wszystkie komponenty, tworzymy nowa tablice
                        boardData: [...prevState.boardData, response.data],
                        listName: ''
                    }
                });
            })
        //console.log(this.state.listName)
    }

    render() {
        return (
            <div className="col-3">
                <div className="row">
                    <input value={this.state.name} onChange={this.onListNameChange} className="form-control col-8" />
                    <button onClick={this.saveListName} className="btn btn-success col-2">Edit</button>
                    <button onClick={this.deleteList} className="btn btn-danger col-2 btn-block">X</button>
                </div>
                <div className="card card-block">
                    {this.renderCards()}
                </div>
                <input value={this.state.cardName} onChange={this.onCardNameChange} className="form-control col-8" />
                <button onClick={this.addCard} className="btn btn-warning btn-sm">Add card</button>
            </div>
        )
    }
}