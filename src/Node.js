import React, {Component} from 'react';
import './Grid.css';
class Node extends Component {
    constructor(props) {
        super(props);
        this.nodeId= this.props.nodeId;
        this.rawId= this.props.rawId;
        this.start = this.props.start;
        this.end = this.props.end;
        this.isVisited=this.props.isVisited;
        this.searchNeighbors= this.props.searchNeighbors;
        this.putWeight=this.putWeight.bind(this);
    }
    putWeight(e){
        e.currentTarget.setAttribute("id", "toggled")
    }

    render(){
            if(this.start){
                return(<div name={this.nodeId+" "+this.rawId} className="node" id='start' nodeid={this.nodeId} rawid={this.rawId} onClick={this.props.onClick[this.props.select]} disabled={true}>
                </div>)
            }
            else if(this.end){
                return(<div name={this.nodeId+" "+this.rawId} className="node" id='end' nodeid={this.nodeId} rawid={this.rawId} onClick={this.props.onClick[this.props.select]} disabled={true}>
                </div>)
            }
            else{
            return(<div name={this.nodeId+" "+this.rawId} className="node" nodeid={this.nodeId} rawid={this.rawId} onClick={this.props.onClick[this.props.select]} onMouseDown={this.putWeight}>
            </div>)};

    }
}

export default Node;