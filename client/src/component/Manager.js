import React from "react";
import "../App.css";
// import Drop from "./component/Drop";
import Modal from "./UI/Modal/Modal";
import Layout from "./Layout/Layout";
import List from "./List/List";
import NewList from "./NewList/NewList";
import EditList from "./EditList/EditList";
import RentCalculator from "./RentCalculator";
// import HelloSign from "hellosign-embedded";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      owners: [],
      leases: [],
      tenants: [],
      tenantsbyLease: [],
      adding: false,
      calculate: false,
      editing: {
        property: null,
        isEditable: false
      }
    };
    this.addProperty = this.addProperty.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.addingHandler = this.addingHandler.bind(this);
    this.calculateHandler = this.calculateHandler.bind(this);
    this.editingHandler = this.editingHandler.bind(this);
  }

  //mount all properties when page loads
  componentDidMount() {
    // console.log("start mounting");
    fetch("/propertymgmt/properties")
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          properties: json
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.getOwners();
    this.getLeases();
    this.getTenants();
    this.getTenantsByLease();
  }

  getOwners() {
    fetch("/propertymgmt/owners")
      .then(res => res.json())
      .then(data => {
        // console.log("getOwner()", data);
        this.setState({
          owners: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLeases() {
    fetch("/propertymgmt/leases")
      .then(res => res.json())
      .then(data => {
        // console.log("getLeases()", data);
        this.setState({
          leases: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTenants() {
    fetch("/propertymgmt/tenants")
      .then(res => res.json())
      .then(data => {
        console.log("getTenants() HERE", data);
        this.setState({
          tenants: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
//   async getSubjectsbyTeacherId(teacher_id) {
//     // console.log("Teacher id on click", teacher_id);
//     try {
//         const response = await axios.get(`http://localhost:5000/users/myschooladmin/subjects/` + teacher_id);
//         this.subjectsbyTeacherId = response.data;
//         // console.log("list of subjects", this.subjectsbyTeacherId);
//     } catch(err) {
//         console.log(err);
//     }
// },
  getTenantsByLease(id) {
    console.log(id, "get tenant by lease id");
    // fetch("/propertymgmt/tenants/1")
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log("getTenantsByLease()", data);
    //     // this.setState({
    //     //   tenantsbyLease: data
    //     // });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  addProperty(newProperty) {
    console.log("new prop address", newProperty.address);
    console.log("properties object", newProperty);
    fetch("/propertymgmt/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: newProperty.address,
        owner_id: newProperty.owner,
        property_postcode: newProperty.postcode,
        property_photo: newProperty.photo,
        property_bedroom: newProperty.bedroom,
        property_bathroom: newProperty.bathroom,
        property_carpark: newProperty.carpark,
        property_furnish: newProperty.furnish,
        property_rent: newProperty.rent,
        property_rentWeek: newProperty.rentWeek
      })
    })
      .then(res => {
        // console.log("submit btn clicked and called POST");
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ adding: false });
  }

  updateProperty(newVal) {
    console.log("updatedProperty in App", newVal, newVal.id);
    fetch("/propertymgmt/properties/" + newVal.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: newVal.address,
        owner_id: newVal.owner,
        property_postcode: newVal.postcode,
        property_photo: newVal.photo,
        property_bedroom: newVal.bedroom,
        property_bathroom: newVal.bathroom,
        property_carpark: newVal.carpark,
        property_furnish: newVal.furnish,
        property_rent: newVal.rent,
        property_rentWeek: newVal.rentWeek
      })
    })
      .then(res => {
        res.json();
        this.setState({
          editing: {
            property: null,
            isEditable: false
          }
        });
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProperty(id) {
    // console.log("taken id", id);
    fetch("/propertymgmt/properties/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
    // console.log("This property id was deleted", id);
  }

  // logoutHandler() {
  //   alert("work saved! logged out");
  // }

  
  addingHandler() {
    console.log("adding", this.state.adding);
    if (this.state.adding) {
      this.setState({ adding: false });
    }
    else {
      this.getOwners();
      this.setState({ adding: true });
    }
  }

  calculateHandler() {
    if (this.state.calculate) {
      this.setState({ calculate: false });
      // window.location.reload();
    }
    else {
      this.setState({ calculate: true });
    }
  }


  editingHandler(property) {
    console.log("edit handler", this.state.editing.isEditable);
    if (this.state.editing.isEditable) {
      this.setState({
        editing: {
          property: null,
          isEditable: false
        }
      });
    }
    else {
      this.setState({
        editing: {
          property: property,
          isEditable: true
        }
      });
    }
  }

  getProperty(id) {
    return this.state.properties.filter(eachProperty => eachProperty.id === id);
  }

  // signHandler() {
  //   console.log("Sign here please...");
  //   const client = new HelloSign({
  //     clientId: "0ce014a59e087c76d07bb63819c363e9"
  //   });
  //   console.log("what's in client: ", client);
  //   client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=e1d3dade7e8f058cfa040b181d6e68e3&token=c80d494dcf1221a9a31ff7a03d7ac236", {
  //     allowCancel: true,
  //     skipDomainVerification: true,
  //     testMode: true
  //   });
  //   client.on(HelloSign.events.SIGN, (data) => {
  //     console.log('The document has been signed!');
  //   })   
  // }  

  render() {
    const numProperties = this.state.properties.length;
    const vacancy = this.state.properties.filter(e =>
      e.property_rent === 0
    ).length;
    const totalRentMonth = this.state.properties.filter(e => e.property_rent === 1).reduce((prev, curr) => prev + curr.property_rentWeek, 0) * 4;
    const vacancyRate = (vacancy / numProperties * 100).toFixed(2);

    return (
      <div>

        <Layout
          // logoutbtn={this.logoutHandler}
          newbtn={this.addingHandler}
          calculatebtn={this.calculateHandler}
          // signbtn={this.signHandler}
        >
        </Layout>
 
          <div className="row m-5">
            <div className="col-2">
                <div className="card-body text-light text-center bg-primary mb-3 rounded">
                  <h1 className="card-title">{numProperties}</h1>
                  <p className="card-text">properties under management</p>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="card-body text-light text-center bg-danger mb-3 rounded">
                      <h1 className="card-title">{vacancy}</h1>
                      <p className="card-text">vacant properties</p>
                    </div>
                  </div>
                </div>

            <div className="row">
              <div className="col">
                <div className="card-body text-light text-center bg-primary mb-3 rounded">
                  <h1 className="card-title">${totalRentMonth}</h1>
                  <p className="card-text">monthly rent collection</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="card-body text-light text-center bg-danger mb-3 rounded">
                  <h1 className="card-title">{vacancyRate}%</h1>
                  <p className="card-text">vacancy rate</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col">
            <List
              properties={this.state.properties}
              delete={this.deleteProperty}
              owner={this.state.owners}
              edit={this.editingHandler}
              lease={this.state.leases}
              tenants={this.state.tenants}
            />
          </div>

        </div>

        <div>
          <Modal cancel={this.addingHandler} show={this.state.adding}>
            <NewList
              owners={this.state.owners}
              cancel={this.addingHandler}
              add={this.addProperty}
            />
          </Modal>
        </div>

        { (this.state.editing.isEditable) ?
          <Modal cancel={this.editingHandler} show={this.state.editing.isEditable}>
            <EditList
              property={this.state.editing.property}
              owners={this.state.owners}
              update={this.updateProperty}
              cancel={this.editingHandler}
            />
          </Modal> : <div></div>}

        <div>
          <Modal cancel={this.calculateHandler} show={this.state.calculate}>
              <RentCalculator
                cancel={this.calculateHandler}
              />
            </Modal>  
        </div>

        {/*       
        { (this.state.editing.isEditable) ?  
        <EditList 
          property={this.state.editing.property}
          owners={this.state.owners}
          update={this.updateProperty}
          cancel={this.editingHandler}
          /> : <div></div> } */}

      </div>
    )
  };
}

export default Manager;