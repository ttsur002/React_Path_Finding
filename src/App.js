import React, {Component} from 'react';
import './App.css';
class App extends Component{
    constructor(props) {
        super(props);
        this.state={count: 0}
        this.clickButton = this.clickButton.bind(this);
    }
    clickButton(){
        this.setState(state=>({
            count: this.state.count++
        }))
    }
    render(){
        return(
            <span>
                <p>Hello, {this.props.name}
                </p>
                <button onClick={this.clickButton}>"Click Me!"</button>
                <p>The number of clicks: {this.state.count} </p>
            </span>
        )
    };
}

export default App;
