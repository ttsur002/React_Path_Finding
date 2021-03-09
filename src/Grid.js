import React, {Component} from 'react';
import './index.css';
import './Grid.css';
import Node from './Node';
import Search from './Search'
const NUMBER_OF_RAW =15;
const NUMBER_OF_COLUMN =15;
const START_NODE_ROW=0;
const START_NODE_COL=7;
const FINISH_NODE_ROW=NUMBER_OF_RAW-1;
const FINISH_NODE_COL=NUMBER_OF_COLUMN-1-7;
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUMBER_OF_RAW; row++) {
        const currentRow = [];
        for (let col = 0; col < NUMBER_OF_COLUMN; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}　
const createNode = (row, col) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        searchNeighbors: function() {
            let neighbors=[];
            let check=(row,col)=>{
                if(col>=0 && row>=0 && col < NUMBER_OF_COLUMN && row<NUMBER_OF_RAW){
                        if(!grids[row][col].isVisited){
                            return true
                        }
                }

            };
            if(check(this.row-1,this.col)){
                neighbors.push(grids[this.row-1][this.col])
            }
            if(check(this.row+1,this.col)){
                neighbors.push(grids[this.row+1][this.col])
            }
            if(check(this.row,this.col-1)){
                neighbors.push(grids[this.row][this.col-1])
            }
            if(check(this.row,this.col+1)){
                neighbors.push(grids[this.row][this.col+1])
            }
            return neighbors
        }
    };
};
const grids=getInitialGrid();
const search = new Search(grids,NUMBER_OF_COLUMN,NUMBER_OF_RAW);
class Grid extends Component{
    constructor(props) {
        super(props);
        this.setStart = this.setStart.bind(this);
        this.setGoal  = this.setGoal.bind(this);
        this.selectOption=this.selectOption.bind(this);
        this.state={select: "-1"};
        this.current_select={"0":this.setStart, "1":this.setGoal};
        this.putWeight=this.putWeight.bind(this)

    }
    selectOption(e){
        switch(e.currentTarget.innerText) {
            case "Start":
                if(document.getElementById("button_on")===null){
                    this.setState(()=>({
                        select: "0"}));
                    e.currentTarget.setAttribute("id", "button_on")
                }
                else{
                    if(e.currentTarget.hasAttribute("id")){
                        this.setState(()=>({
                            select: "-1",}));
                        e.currentTarget.removeAttribute("id");
                    }
                    else{
                        document.getElementById("button_on").removeAttribute("id")
                        this.setState(()=>({
                            select: "0"}));
                        e.currentTarget.setAttribute("id", "button_on")
                    }
                }
                break
            case "End":
                if(document.getElementById("button_on")===null){
                    this.setState(()=>({
                        select: "1"}));
                    e.currentTarget.setAttribute("id", "button_on")
                }
                else{
                    if(e.currentTarget.hasAttribute("id")){
                        this.setState(()=>({
                            select: "-1"}));
                        e.currentTarget.removeAttribute("id");
                    }
                    else{
                        document.getElementById("button_on").removeAttribute("id")
                        this.setState(()=>({
                            select: "1"}));
                        e.currentTarget.setAttribute("id", "button_on")
                    }
                }
                break
            case "Search":
                if(document.getElementById("button_on")===null){
                    e.currentTarget.setAttribute("id", "button_on")
                }
                else{
                    document.getElementById("button_on").removeAttribute("id")
                    this.setState(()=>({
                        select: "-1"}));
                    e.currentTarget.setAttribute("id", "button_on")
                }
                search.breadth_first_search();
                break
            default:
                break
        }

    }
    putWeight(e){
        e.currentTarget.setAttribute("id", "toggled")
    }
    setStart(e){
        grids[document.getElementById("start").getAttribute("rawid")][document.getElementById("start").getAttribute("nodeid")].isStart=false
        document.getElementById("start").removeAttribute("disabled")
        document.getElementById("start").onmousedown=this.putWeight
        document.getElementById("start").removeAttribute("id")
        e.currentTarget.setAttribute("id", "start")
        e.currentTarget.setAttribute("disabled",true)
        grids[e.currentTarget.getAttribute("rawid")][e.currentTarget.getAttribute("nodeid")].isStart=true
        console.log(grids)

    };
    setGoal(e){
        grids[document.getElementById("end").getAttribute("rawid")][document.getElementById("end").getAttribute("nodeid")].isFinish=false
        document.getElementById("end").removeAttribute("disabled")
        document.getElementById("end").onmousedown=this.putWeight
        document.getElementById("end").removeAttribute("id")
        e.currentTarget.setAttribute("id", "end")
        e.currentTarget.setAttribute("disabled",true)
        grids[e.currentTarget.getAttribute("rawid")][e.currentTarget.getAttribute("nodeid")].isFinish=true
        console.log(grids)
    };

    render() {
        return(
            <div>
            <span id="bar">
            <div name="start" className="button" onClick={this.selectOption}> Start </div>
            <div name="end" className="button" onClick={this.selectOption}> End </div>
                <div name="search" className="button" onClick={this.selectOption}> Search </div>
            </span>
        <div className='grid'>
                {grids.map((raw, rawId)=>{
                    return(
                        <div key={rawId}>
                            {raw.map((node,nodeId)=>{
                                if(rawId===0 && nodeId===0) {
                                    return (
                                        <Node key={grids[rawId][nodeId].col} nodeId={grids[rawId][nodeId].col} rawId={grids[rawId][nodeId].row} onClick={this.current_select}  select={this.state.select} start={grids[rawId][nodeId].isStart} end={grids[rawId][nodeId].isFinish} isVisited={grids[rawId][nodeId].isVisited} searchNeighbors={grids[rawId][nodeId].searchNeighbors()}></Node>
                                    )
                                }else if(rawId===NUMBER_OF_RAW-1 && nodeId===NUMBER_OF_COLUMN-1){
                                    return(
                                        <Node key={grids[rawId][nodeId].col} nodeId={grids[rawId][nodeId].col} rawId={grids[rawId][nodeId].row} onClick={this.current_select}  select={this.state.select} start={grids[rawId][nodeId].isStart} end={grids[rawId][nodeId].isFinish} isVisited={grids[rawId][nodeId].isVisited} searchNeighbors={grids[rawId][nodeId].searchNeighbors()}></Node>

                                    )
                                }
                                else{
                                    return(
                                        <Node key={grids[rawId][nodeId].col} nodeId={grids[rawId][nodeId].col} rawId={grids[rawId][nodeId].row} onClick={this.current_select} select={this.state.select} start={grids[rawId][nodeId].isStart} end={grids[rawId][nodeId].isFinish} isVisited={grids[rawId][nodeId].isVisited} searchNeighbors={grids[rawId][nodeId].searchNeighbors()}></Node>

                                    )         }
                            })}
                        </div>
                    )
                })}
            </div>
            </div>
        )
    }
}

export default Grid;