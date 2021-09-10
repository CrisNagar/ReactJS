import React from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

class AlertDismissible extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        }

        //console.log('constructor', this.state.show)
    }

    componentDidMount() {
        this.setState({
            show: this.props.show
        })

        //console.log('componentDidMount', this.state.show)
    }

    componentDidUpdate() {
        //console.log('componentDidUpdate', this.props.show)
    }

    handleShowAlert(show) {
        //console.log('handleShowAlert', this.state.show)
        this.setState({
            show: show
        })
    }

    render() {
        //console.log('render', this.state.show)
        if (this.props.show) {
            return (
                <ToastContainer className="bg-danger mt-5 me-5" position="top-end">
                    <Toast onClose={() => this.handleShowAlert(false)} show={this.props.show} delay={3000} autohide>
                        <Toast.Body>Acción no válida</Toast.Body>
                    </Toast>
                </ToastContainer>
            );
        } else {
            return null
        }
    }

}

export default AlertDismissible