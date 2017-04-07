import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {BrowserRouter, Route} from 'react-router-dom';
import {ApolloClient, createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

import './App.css';
import Home from './components/Home';
import WellDone from './components/WellDone';
import Lecture from './components/Lecture';
import Questions from './components/Questions';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql',
    opts: {
        credentials: 'include',
    },
});

const client = new ApolloClient({
    networkInterface,
});

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <div className="App">
                        <Header/>
                        <div className="App-intro styleIntroduction">
                            <Route exact key="tutorial" path="/" component={Home}/>
                            <Route exact key="Lecture" path="/lecture"
                                   component={Lecture}/>

                            <Route exact key="wellDone" path="/wellDone"
                                   component={WellDone}/>


                            <Route exact key="questions" path="/questions"
                                   component={Questions}/>
                            <Route exact key="login" path="/login" component={Login}/>
                            <Route exact key="signup" path="/signup" component={Signup}/>
                            <Footer/>
                        </div>
                    </div>
                </ApolloProvider>
            </BrowserRouter>
        );
    }
}

export default App;
