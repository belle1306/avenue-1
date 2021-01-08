import React from "react";
import ListItem from "./ListItem/ListItem";
import classes from "./List.module.css";

class List extends React.Component {

    showOwner = (owner, id) => {
        const ownerIndex = owner.findIndex(o => {
          return o.id === id;
        });
        let selectedOwner = owner[ownerIndex]
        if(selectedOwner) {
          return selectedOwner.owner_firstName + " " + selectedOwner.owner_lastName;
        }
        else {
         return null;
        }
    }

    render() {
        const propertyList = this.props.properties.map(p => {
            let selectedOwner = this.showOwner(this.props.owner, p.owner_id)
            console.log(selectedOwner)
            return (
                <ListItem key = {p.id}
                property = {p}
                delete = {() => this.props.delete(p.id)}
                owner = {selectedOwner}
                edit = {() => this.props.edit(p)}
                />
            )
        })
        console.log(propertyList)
        return (
            <div className={classes.List}>
                {propertyList}
            </div>
        );
    };
}

export default List;