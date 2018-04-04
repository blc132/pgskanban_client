import React from 'react';
import List from './List' //import listy
import Card from './Card' //import card
import FakeData from '../FakeData';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../constans';
import axios from 'axios';
import './Board.css'


export class Board extends React.Component {
    constructor() {
        super() //wywolujemy konstruktor React.Component
        this.state = {
            boardName: '',
            boardId: 0,
            boardData: [],
        }
    }

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

    renderList = () => {
        console.log(this.state.boardData)
        return (
            this.state.boardData.map(
                (list) => <List listName={list.name} cards={[]} />)
        )
    }


    render() {
        return (
            <div>
                <div>
                    {this.state.boardName}
                    <button className="btn btn-info">Add new list</button>
                    <input />
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

export default withRouter(Board)