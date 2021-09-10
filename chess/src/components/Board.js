import React from "react";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startBoard: [
                ["", "A", "B", "C", "D", "E", "F", "G", "H", ""],
                ["8", "R", "N", "B", "Q", "K", "B", "N", "R", "8"],
                ["7", "P", "P", "P", "P", "P", "P", "P", "P", "7"],
                ["6", null, null, null, null, null, null, null, null, "6"],
                ["5", null, null, null, null, null, null, null, null, "5"],
                ["4", null, null, null, null, null, null, null, null, "4"],
                ["3", null, null, null, null, null, null, null, null, "3"],
                ["2", "P", "P", "P", "P", "P", "P", "P", "P", "2"],
                ["1", "R", "N", "B", "Q", "K", "B", "N", "R", "1"],
                ["", "A", "B", "C", "D", "E", "F", "G", "H", ""],
            ],
            pieces: this.props.pieces,
            positions: this.props.positions
        }
    }

    render() {
        const pieces = this.state.pieces;
        const positions = this.state.positions;

        return (
            <section className="container text-center border border-5 my-5 mx-auto">
                {this.state.startBoard.map((row, i) => {
                    return (
                        <div className="row" key={i}>
                            {row.map((square, k) => {
                                const pieceColor = (i === 1 || i === 2) ? "BLACK" : "WHITE";
                                const squarePosition = `${positions[k - 1]}${row.length - i - 1}`
                                let dynamicProp = {}

                                if (square === "P") {
                                    dynamicProp = { "data-start": true }
                                }

                                if (i === 0 || i === row.length - 1) {
                                    return (<div className="col letter" key={k}> {square} </div>)
                                } else if (k === 0 || k === row.length - 1) {
                                    return (<div className="col number" key={k}> {square} </div>)
                                } else if (k % 2 !== i % 2) {
                                    if (square === null) {
                                        return (
                                            <div className="col" key={k}>
                                                <button className="square black" data-position={squarePosition} onClick={(b) => this.props.onClick(b)}>
                                                    &nbsp;
                                                </button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="col" key={k}>
                                                <button className="square black" data-position={squarePosition} onClick={(b) => this.props.onClick(b)}>
                                                    <i className={pieces[pieceColor][square]} data-piece={square} data-player={pieceColor} {...dynamicProp}></i>
                                                </button>
                                            </div>
                                        )
                                    }
                                } else {
                                    if (row[k] === null) {
                                        return (
                                            <div className="col" key={k}>
                                                <button className="square white" data-position={squarePosition} onClick={(b) => this.props.onClick(b)}>
                                                    &nbsp;
                                                </button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="col" key={k}>
                                                <button className="square white" data-position={squarePosition} onClick={(b) => this.props.onClick(b)}>
                                                    <i className={pieces[pieceColor][square]} data-piece={square} data-player={pieceColor} {...dynamicProp}></i>
                                                </button>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                    )
                })}
            </section>
        )
    }
}

export default Board;