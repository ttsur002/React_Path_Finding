import React, {Component} from 'react';


class Search {
    constructor(grid,col,row) {
        this.grid=grid;
        this.col=col;
        this.row=row;
    }
    breadth_first_search(){
        let nodes=document.getElementsByClassName("node")
        for (let i=0;i<nodes.length;i++){
            let reset_raw=nodes[i].getAttribute("rawid")
            let reset_col=nodes[i].getAttribute("nodeid")
            this.grid[reset_raw][reset_col].isVisited=false;
            if(nodes[i].hasAttribute("isvisited")){
                nodes[i].removeAttribute("isvisited")
            }
        }
        let queue=[]
        let row=document.getElementById("start").getAttribute("rawid")
        let col=document.getElementById("start").getAttribute("nodeid")
        queue.push(this.grid[row][col]);
        while(queue.length!==0){
            let current_node=queue.shift();
            let current=current_node.col+" "+current_node.row;
            current_node.isVisited=true;
            document.getElementsByName(current)[0].setAttribute("isVisited",true)
            let neighbors=current_node.searchNeighbors();
            for(let i=0;i<neighbors.length;i++) {
                if (current_node.isFinish) {
                    alert("Found")
                    return
                }
                queue.push(neighbors[i])
            }
    }
    }
}

export default Search;