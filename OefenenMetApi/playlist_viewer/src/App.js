import logo from './logo.svg';
import React, {Component } from 'react';
import axios from 'axios' 

import './App.css';
import GetPlaylists from './Screens/Dashboard/GetItems';
import Filters from './Screens/Dashboard/Components/Filters';
import CollectUser from './User';
import GetArtists from './Screens/Dashboard/GetArtist';
import DisplayUserPlaylists from './Screens/Dashboard/DisplayUserPlaylists';
import GetUserModel from './Screens/User/GetUserModel';
import getToken from './services/TokenService'
import getUser from './services/UserService';


export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            filters:{
                naam:"",
                sorterenOp:"naam"
            },
            token:"",
        }
    }
    setToken(token){
        this.setState({token:token})
    } 
    setUser(user){
        this.setState({user:user})
    }

    //Dit wordt een keer uitgevoerd om ervoor te zorgen dat alles goed gaat
    componentDidMount() {
        const tempToken = getToken()
        this.setToken(tempToken)
        if(tempToken!=""){
            this.setUser(getUser(tempToken))
        }
    }

    render(){
    const {token,user} = this.state
    return (
            <div className="App">
                <header role="banner">
                    <div className='header-item'>
                        <h1>Spotify React</h1>
                    </div>
                    <div className='header-item right'>
                        <CollectUser
                            setToken = {(e) => this.setToken(e)}
                        />

                    </div>
                    </header>
                    <div className='Deck'>
                    <p>token:{this.state.token}</p>
                    </div>
            </div>
        );
    }
}
/*
                        
<GetUserModel 
                            token = {token}
                            user = {user}
                        />
                        <DisplayUserPlaylists 
                            token={token}
                        />
*/