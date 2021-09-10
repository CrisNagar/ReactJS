import React from "react";

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreWhite: 0,
            scoreBlack: 0,
        }
    }

    componentDidMount() {
        this.setState({
            nextPlayer: this.props.nextPlayer,
        })
    }

    render() {
        return (
            <React.Fragment>
                <section className="container-fluid text-center my-5">
                    <div className="row">
                        <div className="col">
                            <h1>MARCADOR</h1>
                            <h2 className="text-uppercase">Jugador: {this.props.nextPlayer}</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h6>BLANCAS</h6>
                            <ul id="white-kills" className="list-group list-unstyled bg-dark overflow-auto"></ul>
                        </div>

                        <div className="col">
                            <h6>NEGRAS</h6>
                            <ul id="black-kills" className="list-group list-unstyled bg-light overflow-auto"></ul>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default ScoreBoard;