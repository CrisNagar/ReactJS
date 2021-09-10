/* Framework */
import React from 'react';

/* Libraries */
import Data from './library/Data'
import Movements from './library/Movements';

/* Style CSS, SASS, LESS */
import './App.css';

/* Components */
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import Menu from './components/Menu';
import Alert from './components/Alert';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMoving: false,
      startPlayer: ["WHITE", "BLACK"][Math.floor(Math.random() * 2)],
      nextPlayer: null,
      emptySquare: "&nbsp;",
      currentSelected: {
        item: null,
        position: null
      },
      data: new Data(),
      movements: new Movements(),
      isFail: false
    }
  }

  componentDidMount() {
    this.setState({
      nextPlayer: this.state.startPlayer,
    })
  }

  updateGame(item, position) {
    /* 
    SI MOVIMIENTO ES TRUE (YA EXISTE UNA FICHA SELECCIONADA QUE SE QUIERE MOVER) 
    OBTENEMOS LA FICHA SELECCIONADA ANTERIORMENTE Y RESTAURAMOS SU OPACIDAD
    */
    if (this.state.isMoving) {
      let el = this.state.currentSelected.item
      el.innerHTML = ""
      el.style.opacity = "1"
      this.updateCurrentPlayer() // ACTUALIZAR TURNO JUGADOR
    } else {
      /* 
      SI MOVIMIENTO ES FALSE (PRIMER CLICK DEL TURNO)
      MODIFICAMOS LA OPACIDAD DEL ITEM DE ENTRADA
      ACTUALIZAMOS EL ESTADO DE SELECCION
       */
      item.style.opacity = "0.4"
    }

    this.updateMovementState() // ACTUALIZAMOS FASE MOVIMIENTO
    this.updateCurrentSelected(item, position) // ACTUALIZAMOS LA FICHA SELECCIONADA
  }

  updateCurrentSelected(item, position) {
    // GUARDAMOS EL OBJETO SELECCIONADO Y SU POSICION EN EL TABLERO
    this.setState({
      currentSelected: {
        item: item,
        position: position
      }
    })
  }

  updateCurrentPlayer() {
    // ACTUALIZAMOS EL TURNO DE LOS JUGADORES AL SIGUIENTE
    this.setState({
      nextPlayer: this.state.nextPlayer === "BLACK" ? "WHITE" : "BLACK"
    })
  }

  updateMovementState() {
    // ACTUALIZAMOS SI EL JUGADOR ESTA EN FASE DE MOVIMIENTO O NO
    this.setState({
      isMoving: !this.state.isMoving
    })
  }

  changeSelection(item, position) {
    // ACTUALIZAMOS LA FICHA SELECCIONADA SI EL JUGADOR PULSA SOBRE OTRA FICHA QUE SEA DE SU COLOR
    let el = this.state.currentSelected.item
    el.style.opacity = "1"
    item.style.opacity = "0.4"

    this.updateCurrentSelected(item, position)// ACTUALIZAMOS LA FICHA SELECCIONADA
  }

  updateShowFailState(fail) {
    this.setState({
      isFail: fail
    })
  }

  handleClick(el) {
    if (!this.state.isMoving && el.currentTarget.firstElementChild && el.currentTarget.firstElementChild.dataset.player === this.state.nextPlayer) {
      /* 
    SI NO ESTA MOVIENDOSE (COMIENZO DEL TURNO)
    &&
    SE HA PULSADO UNA CASILLA CON UNA FICHA
    &&
    EL JUGADOR DE LA FICHA PULSADA ES EL MISMO DEL TURNO
    */
      this.updateGame(el.currentTarget, el.currentTarget.dataset.position) //ACTUALIZACION DE PARTIDA
      this.updateShowFailState(false) // OCULTAMOS CUALQUIER ALERTA MOSTRADA
    } else if (this.state.isMoving) {
      /* 
      SI ESTA MOVIENDOSE (YA SE HA PULADO UNA FICHA AL MENOS UNA VEZ)
      */

      if (el.currentTarget === this.state.currentSelected.item) return //SI SE PULSA DOS VECES LA MISMA CASILLA NO HACEMOS NADA 

      if (this.state.movements.checkMovement(this.state.nextPlayer, this.state.currentSelected.item.firstElementChild.dataset.piece, this.state.currentSelected.item.dataset.position, el.currentTarget.dataset.position)) {
        // COMPROBAMOS QUE EL MOVIMIENTO QUE SE INTENTA ES VALIDO
        el.currentTarget.innerHTML = this.state.currentSelected.item.innerHTML //MOVEMOS LA FICHA A LA NUEVA POSICION
        this.updateGame(el.currentTarget, null)//ACTUALIZACION DE PARTIDA
        this.updateShowFailState(false) // OCULTAMOS CUALQUIER ALERTA MOSTRADA
      } else {
        // SI EL MOVIMIENTO QUE SE INTENTA NO ES VALIDO
        if (this.state.currentSelected.item.firstElementChild && el.currentTarget.firstElementChild) {
          // SI PULSAMOS SOBRE OTRA FICHA TENIENDO YA UNA SELECCIONADA
          if (el.currentTarget.firstElementChild.dataset.player === this.state.currentSelected.item.firstElementChild.dataset.player) {
            // SI SON FICHAS DEL MISMO JUGADOR CAMBIAMOS LA SELECCION ACTUAL
            return this.changeSelection(el.currentTarget, el.currentTarget.dataset.position)
          }
        }

        // SI LO QUE SE INTENTA NO ESTA PERMITIDO MOSTRAMOS UNA ALERTA AL USUARIO
        this.updateShowFailState(true)
        console.warn("Acción no válida", this.state.isFail)
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Menu />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-10">
              <Board pieces={this.state.data["PIECES"]} positions={this.state.data["POSITIONS"]} nextPlayer={this.state.nextPlayer} onClick={(el) => this.handleClick(el)} />
            </div>

            <div className="col-12 col-lg-2 order-1 order-lg-2">
              <ScoreBoard nextPlayer={this.state.nextPlayer} />
            </div>
          </div>
        </div>

        <Alert show={this.state.isFail} />
      </React.Fragment>
    )
  }
}

export default App;
