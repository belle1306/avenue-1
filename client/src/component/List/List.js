import React from "react";
import ListItem from "./ListItem/ListItem";
import classes from "./List.module.css";
import moment from 'moment';
class List extends React.Component {

    showOwner = (owner, id) => {
        const ownerIndex = owner.findIndex(o => {
            return o.id === id;
        });
        let selectedOwner = owner[ownerIndex];
        if (selectedOwner) {
            return selectedOwner.owner_firstName + " " + selectedOwner.owner_lastName;
        }
        else {
            return null;
        }
    }

    showLease = (lease, id) => {
        const leaseIndex = lease.findIndex(l => {
            return l.id === id;
        });
        let selectedLease = lease[leaseIndex];
        if(selectedLease) {
            return `${moment(selectedLease.leaseStart).format('MMMM Do YYYY')} to ${moment(selectedLease.leaseEnd).format('MMMM Do YYYY')}`;
        } 
        else {
            return null;
        }
    }
    
    showTenants = (leaseId, tenants) => {
        // console.log("Lease id we want to match", leaseId);
        // console.log("tenants in showTenants", tenants);
        const leaseIdForTenants = tenants.map(e => {
            return e.lease_id;
        });
        // console.log("lease Id for Tenants", leaseIdForTenants);
        // let unique = [...new Set(leaseIdForTenants)];
        // console.log("should be unique", unique);

        let matchedId = leaseIdForTenants.find(i => {
            return i === leaseId;
        });
        // console.log("matched lease Ids OUTSIDE map", matchedId);

        const tenantInfo = tenants.map(e => {
            // console.log("matched lease Ids IN MAP", matchedId);
            if(e.lease_id === matchedId) {
                return e.tenant_firstName + " " + e.tenant_lastName + " ";
            }
            else {
                return " ";
            }
        });
        // console.log("tenants first name", tenantInfo);
        return tenantInfo;
    }
    //ACTUALLY WE DONT NEED TENANT ID IN LEASES TABLE

    render() {
        const propertyList = this.props.properties.map(p => {
            let selectedOwner = this.showOwner(this.props.owner, p.owner_id);
            // console.log(selectedOwner);
            let selectedLease = this.showLease(this.props.lease, p.lease_id);
            // console.log("selected lease", selectedLease);
            let selectedTenant = this.showTenants(p.lease_id, this.props.tenants);
            // console.log("this.props.tenants", this.props.tenants);
    
            return (
                <ListItem key={p.id}
                    property={p}
                    delete={() => this.props.delete(p.id)}
                    owner={selectedOwner}
                    edit={() => this.props.edit(p)}
                    lease={selectedLease}
                    tenants={selectedTenant}
                />
            )
        })
        // console.log(propertyList);
        return (
            <div className={classes.List}>
                {propertyList}
            </div>
        );
    };
}

export default List;