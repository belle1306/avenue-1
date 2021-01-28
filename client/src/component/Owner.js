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
          clientId: "0ce014a59e087c76d07bb63819c363e9"
        });
        console.log("what's in client: ", client);
        client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=787e76989f2b6e8142aa3ee213e893d4&token=372672df611d7778c566ff1bd4dde79a", {
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