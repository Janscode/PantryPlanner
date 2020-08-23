import React, {Component} from 'react';
import Button from '@material-ui/core/Button'

export default class Order extends Component{
    render(){
        return(
            <div>
                {this.props.order.name} <Button> Cancel Order </Button>
            </div>
        );
    }
}