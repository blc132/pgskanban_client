import React from 'react';
import List from './List' //import listy
import Card from './Card' //import card
import FakeData from '../FakeData';
import './Board.css'

export default class Board extends React.Component {
    constructor() {
        super() //wywolujemy konstruktor React.Component
        this.state = {
            boardName: 'Best board ever!',
            boardData: [],
        }
    }

    componentDidMount() {
        this.setState({boardData: FakeData}) //jedyny sposób na ustawienie naszego stanu po za momentem inicjalizacji
    }

    renderList = () => {
        console.log(this.state.boardData)
        return(
             this.state.boardData.map(
            (list) => <List listName={list.listName} cards={list.cards} />)
            )
    }


    render() {
        return(
            <div>
                <div>
                    {this.state.boardName}
                    <button className="btn btn-info">Add new list</button>
                    <input/>
                </div>
                    <div className="container-fluid">
                        <div className="row flex-row flex-nowrap">
                        {this.renderList()}
                        </div>
                    </div>
                </div>
        )
    }
}