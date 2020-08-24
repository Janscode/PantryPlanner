import React, {Component} from 'react';
import Axios from 'axios';
import Sidebar from "../sidebar";


export default class Hub extends Component {
    state = {
        delivery: null
    }
    getDelivery = () => {
        var formBody = new FormData();
        formBody.append("driver", this.props.name);
        Axios({
            method: "POST",
            url: '/api/getDelivery',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(
            (response) => this.setState({
                delivery: response.data
            })
        )
        .catch(
            (error) => console.log(error)
        );
    }
    
    render(){
        const sidebarButtons=[{click: this.props.logout, text:"Log Out"}]
        console.log(this.state.delivery);
        const pageName = this.props.name + "'s hub";
        return(
            <Sidebar buttons={sidebarButtons} name={pageName}></Sidebar>
            /*
            //<div className="container">
                <div className="left">
                    <h2 >{this.props.name}'s Driver Hub</h2>
                    <button onClick={this.props.logout}>Log out</button>
                </div>
                <div className="right">
                    <h1>Make Delivery</h1>
            //    {this.state.delivery ? this.state.delivery.username : 
            //<button onClick={this.getDelivery}>Get delivery</button>
            }
                </div>
            
            
           //</div>
           */
            
        );
    }
    
}



