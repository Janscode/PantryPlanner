import React, {Component} from 'react';
import Axios from 'axios';
import Sidebar from "../sidebar";
import { Box, Typography, Button } from '@material-ui/core';
import List from '../ListComponent';
import Delivery from './Delivery';


export default class Hub extends Component {
    state = {
        delivery: null,
        pastDeliveries: []
    }
    
    componentDidMount = () => {
        var formBody = new FormData();
        formBody.append("driver", this.props.name);
        Axios({
            method: "POST",
            url: '/api/getPastDelivery',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(
            (response) => this.setState({
                pastDeliveries: response.data.usernames
            })
        )
        .catch(
            (error) => console.log(error)
        );
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

    completeDelivery = (username) => {
        const newDeliveries = this.state.pastDeliveries.concat(username);
        this.setState({
            delivery: null,
            pastDeliveries: newDeliveries
        });
    }
    
    render(){
        const sidebarButtons=[{click: this.props.logout, text:"Log Out"}]
        console.log(this.state.delivery);
        console.log(this.state.pastDeliveries);
        console.log(this.delivery != null)
        const pageName = this.props.name + "'s hub";
        const pastDeliveryRow = (items) => ({index, style}) => {
            let color = "";
            if (index % 2) {
                color = "white";
            }

            return(
                <div style={{backgroundColor: color, minHeight:60}} >
                    <Box display="flex" alignContent="center" justifyContent="center">
                    <h2>{items[index]}</h2>
                    </Box>
                   
                </div>
            );
        };
        const content = 
        <div style={{ width: '100%' }}>
            <Box display="flex" flexDirection="row" mar>
                <Box display="flex" flexGrow={3} justifyContent="center" alignItems="center" >
                    {this.state.delivery != null ? 
                    <Delivery 
                    delivery={this.state.delivery} 
                    completeDelivery={this.completeDelivery} 
                    driver={this.props.name}/>
                    :
                    <Button onClick={this.getDelivery}>Get Delivery</Button>
                    }
                </Box>
                <Box flexGrow={1}>
                    <div style={{backgroundColor: "white", width:"100%", height:40}}>
                        <h3>Past Deliveries</h3>
                    </div>
                    <List height={500} width="100%" rowComponent={pastDeliveryRow} items={this.state.pastDeliveries}/>
                </Box>
            </Box>
        </div>
        return(
            <Sidebar buttons={sidebarButtons} name={pageName} content={content}></Sidebar>
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



