import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import "./../App.css";

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        if(response.status !== 'unknown')
            this.setState({
                isLoggedIn: true,
                name: response.name,
                picture: response.picture.data.url
            });
            
    }

    componentClicked = () => console.log("clicked");

    render() {
        let fbContent;

        this.state.isLoggedIn ?
            fbContent = (
                <div
                    className="m-4"
                    style={{
                        padding: '0px 20px'
                    }}
                >
                    <img src={this.state.picture} alt={this.state.name}/>
                </div>
            ) : fbContent = (
                <div
                    style={{
                        padding: '0px 20px'
                    }}
                >
                    
                <FacebookLogin
                    appId="748745212426220"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                    </div>
            );
            
        
        return (
            <div>
                {fbContent}
            </div>
        )
    }
}
