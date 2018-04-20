import React from 'react';
import List from './List' //import listy
import Card from './Card' //import card
import FakeData from '../FakeData';
//gdy nie ma export default to nie uzywamy nawiasów
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../constans';
import axios from 'axios';
import './Board.css'


class Board extends React.Component {
    constructor() {
        super() //wywolujemy konstruktor React.Component
        this.state = {
            boardName: "",
            boardId: 0,
            boardData: [],
            listName: "",
            cards: [],
        }
    }
    //wykona sie po renderze komponentu
    componentDidMount() {
        axios.get(BASE_URL + '/board').then((response) => {
            console.log(response);
            this.setState({
                boardData: response.data.lists,
                boardName: response.data.name,
                boardId: response.data.id
            })

        }).catch(() => {
            this.props.history.push('/new'); //jedyny sposób na ustawienie naszego stanu po za momentem inicjalizacji
        });
    }

    onChangeListName = (e) => {
        this.setState({ listName: e.target.value })
    }

    onClickList = (e) => {
        axios.post(BASE_URL + "/list", { BoardId: this.state.boardId, Name: this.state.listName })
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

    renderLists = () => {
        console.log(this.state.boardData)
        return (
            this.state.boardData.map((list) =>
                // react bedzie przeladowywal tylko te komponenty ktore zostaly zmienione - key
                <List key={list.id} boardId={this.state.boardId} listId={list.id}
                    listName={list.name} cards={list.cards} />
            ));
    };


    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.boardName}</h1>
                    <button className="btn btn-info" onClick={this.onClickList} disabled={!this.state.listName}>Add new list</button>
                    <input type="text" value={this.state.listName} onChange={this.onChangeListName} className="listName__input" />
                </div>
                <div className="container-fluid">
                    <div className="row flex-row flex-nowrap">{this.renderLists()}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Board)