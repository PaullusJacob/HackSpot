import React, { Component } from 'react';
import Header from '../../components/header/header';
import Home from '../../components/home/home';
class Layout extends Component {
    state ={

    }

    render() {
        return (
            <div>
                <Header/>
                <Home/>
                Footer
            </div>
        )
    }
}

export default Layout;
