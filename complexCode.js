/* complexCode.js */

// This code generates a random maze using Prim's algorithm

// Maze class representing a single cell in the maze
class MazeCell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.walls = [true, true, true, true]; // top, right, bottom, left
  }
}

// MazeGenerator class for creating the maze
class MazeGenerator {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.maze = [];
    this.stack = [];
    this.current = null;
    this.totalCells = rows * cols;
  }

  generateMaze() {
    // Initialize maze with cells
    for (let i = 0; i < this.rows; i++) {
      this.maze[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.maze[i][j] = new MazeCell(i, j);
      }
    }

    this.current = this.maze[0][0];
    this.current.visited = true;
    let visitedCells = 1;

    while (visitedCells < this.totalCells) {
      let next = this.getRandomUnvisitedNeighbor(this.current.row, this.current.col);

      if (next) {
        this.removeWallsBetween(this.current, next);
        this.stack.push(this.current);
        this.current = next;
        this.current.visited = true;
        visitedCells++;
      } else if (this.stack.length > 0) {
        this.current = this.stack.pop();
      }
    }
  }

  getRandomUnvisitedNeighbor(row, col) {
    let neighbors = [];
    if (row > 0 && !this.maze[row - 1][col].visited) {
      neighbors.push(this.maze[row - 1][col]);
    }
    if (col < this.cols - 1 && !this.maze[row][col + 1].visited) {
      neighbors.push(this.maze[row][col + 1]);
    }
    if (row < this.rows - 1 && !this.maze[row + 1][col].visited) {
      neighbors.push(this.maze[row + 1][col]);
    }
    if (col > 0 && !this.maze[row][col - 1].visited) {
      neighbors.push(this.maze[row][col - 1]);
    }

    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
    return null;
  }

  removeWallsBetween(cell1, cell2) {
    if (cell1.row < cell2.row) {
      cell1.walls[2] = false;
      cell2.walls[0] = false;
    } else if (cell1.row > cell2.row) {
      cell1.walls[0] = false;
      cell2.walls[2] = false;
    } else if (cell1.col < cell2.col) {
      cell1.walls[1] = false;
      cell2.walls[3] = false;
    } else if (cell1.col > cell2.col) {
      cell1.walls[3] = false;
      cell2.walls[1] = false;
    }
  }
}

// Usage example

const mazeGenerator = new MazeGenerator(10, 10);
mazeGenerator.generateMaze();

for (let i = 0; i < mazeGenerator.rows; i++) {
  for (let j = 0; j < mazeGenerator.cols; j++) {
    const cell = mazeGenerator.maze[i][j];
    console.log(`Cell at (${cell.row}, ${cell.col}) - Visited: ${cell.visited}`);
    console.log(`Walls: ${cell.walls}`);
  }
}