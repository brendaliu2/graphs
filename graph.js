/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }
  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    //loop through orginal adjacent set vertex
    for (let neighbor of vertex.adjacent) {
      //remove vertex from their set
      neighbor.adjacent.delete(vertex);
    }

    //empty vertex adjacent set
    vertex.adjacent.clear();
    //remove vertex from this.nodes
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) { 
    //create toVisitStack = [n1]
    let toVisitStack = [start];
    //new set of visited neighbors : visited = new Set()
    let visitedNodes = new Set();
    
    //while loop: as long as stack has a length
    while(toVisitStack.length){
      //neighbor = pop stack
      let current = toVisitStack.pop();
      //if !visited.has(neighbor) -> add to visited
      if(!visitedNodes.has(current.value)) {
        visitedNodes.add(current.value);
        //look thru neighbors adjacent, push neighbors to stack
        for(let neighbor of current.adjacent) toVisitStack.push(neighbor);
      }
    }
    return Array.from(visitedNodes);
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { 
    //toVisitQueue = [start]
    let toVisitQueue = [start];
    //new set of visited neighbors: visited = new Set();
    let visited = new Set();
    
    //while loop: Queue has length
    while(toVisitQueue.length){
      let current = toVisitQueue.shift();
       
      if(!visited.has(current.value)){
        visited.add(current.value);
        
        for(let neighbor of current.adjacent) toVisitQueue.push(neighbor);
      }
    }   
    return Array.from(visited);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    //toVisitQueue = [start]
    let layer = 0;
    let toVisitQueue = [[start, layer]];
    //new set of visited neighbors: visited = new Set();
    let visited = new Set();
    
    while(toVisitQueue.length){
      let [current, layer] = toVisitQueue.shift();
      
      if(current === end) return layer;
      
      if(!visited.has(current.value)){
        visited.add(current.value);
        
        for(let neighbor of current.adjacent) toVisitQueue.push([neighbor, layer+1]);
      }
    }   
   }
}

module.exports = { Graph, Node };
