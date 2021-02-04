import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import "./../App.css";
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        if (response.status !== 'unknown')
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
                    <img src={this.state.picture} alt={this.state.name} />
                </div>
            ) : fbContent = (
                <div
                    style={{
                        padding: '0px 20px'
                    }}
                >

                    <FacebookLogin
                        appId="845362466033294"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
<<<<<<< HEAD
                        // cssClass="none"
                        // cssClass="my-facebook-button-class btn  btn-facebook "
                        cssClass="kep-login-facebook kep-login-facebook-small"
                        textButton=" Owner Login"
                        icon="fa-facebook"

=======
                        cssClass="btn btn-facebook"                      
                        // cssClass="my-facebook-button-class"
                        textButton="Owner Login"
                        // icon="fa-facebook"
>>>>>>> 1bd750723131fd00e8937411cb752f8dc1e2ef50
                    />
                </div>
            );


        return (
            <div>
                {fbContent}
            </div>
        )
    }
}
