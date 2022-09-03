import {CELL_GAP, CELL_SIZE, GRID_SIZE} from "./config.js";
import Cell from "./Cell.js";

function createCellElement(gridElement) {
    const cellElements = [];

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++ ) {
        const cellElement = document.createElement('div')
        cellElement.classList.add('cell');
        cellElements.push(cellElement);
        gridElement.append(cellElement);
    }

    return cellElements
}

export default class Grid {

    #cellElements;

    constructor(gridElement) {
        gridElement.style.setProperty('--grid-size', GRID_SIZE.toString())
        gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`)
        gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`)
        
        this.#cellElements = createCellElement(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
    }

    get cellElements() {
        return this.#cellElements
    }

    get cellsByColumn() {
        return this.#cellElements.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        },[])
    }

    get cellsByRow() {
        return this.#cellElements.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
        },[])
    }

    get #emptyCellElements() {
        return this.#cellElements.filter(cellElement => cellElement.tile == null)
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCellElements.length)
        return this.#emptyCellElements[randomIndex]
    }
}