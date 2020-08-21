import React, {Component} from 'react';

export default class Login extends Component {
    state = {
        value: ""
      }
    
      handleChange = (event) => {
        this.setState({value: event.target.value});
      }
    
      handleSubmit = (event) => {
        this.props.login(this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}