import React, { Component } from 'react';
import SearchBar from './SearchBar';
import api from '../api/api';
import ItemList from './ItemList';

class App extends React.Component {
    state = {ramen: [], newItem:[] };
    onTermSubmit= async term =>{
        const response = await api.get()
        this.setState({ ramen: response.data });
        console.log(this.state.ramen)
        const items = this.state.ramen.map((item) => {
            if(item.Brand==term){
                const newItem = {
                    brand: item.Brand,
                    variety: item.Variety,
                    country: item.Country,
                    stars: item.Stars,
                    
                }
                this.setState({newItem})
                console.log(newItem)
            }
            else{
                return <h1>Not found</h1>;
            }
        })
    }
    render() {
        return (
        <div>
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            <ItemList  newItem={this.state.newItem} />
        </div>
        )
    }
}
export default App;