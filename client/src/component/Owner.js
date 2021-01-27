import React from "react";
import "../App.css";
import LayoutOwner from "./Layout/LayoutOwner";
import HelloSign from "hellosign-embedded";

class Owner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    signHandler() {
        console.log("Sign here please...");
        const client = new HelloSign({
          clientId: "cc43fe82df8bf9fbea4ca8d26e0995ad"
        });
        console.log("what's in client: ", client);
        client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=b55c7cc6cae446b5fce2a16470eb59c7&token=ea996318442cf6ef9c5e05828487602a", {
          // url: "SIGN_URL",
          allowCancel: true,
          skipDomainVerification: true,
          testMode: true
        });
        client.on(HelloSign.events.SIGN, (data) => {
          console.log('The document has been signed!');
        })   
      }  

    render() {
        return (
            <div>
                <LayoutOwner
                signbtn={this.signHandler}
                >
                </LayoutOwner>
                <h1>Owner Page</h1>
            </div>
        )
    }
}

export default Owner;