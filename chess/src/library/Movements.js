class Movements {
    PAWN_OFFSETS = {
        BLACK: [-15, -16, -17, -32],
        WHITE: [15, 16, 17, 32]
    }

    PIECE_OFFSETS = {
        N: [-18, -33, -31, -14, 18, 33, 31, 14],
        B: [-17, -15, 17, 15],
        R: [1, 2, 3, 4, 5, 6, 7, 16, 32, 48, 64, 80, 96, -1, -2, -3, -4, -5, -6, -7, -16, -32, -48, -64, -80, -96,],
        Q: [-17, -16, -15, 1, 17, 16, 15, -1],
        K: [-17, -16, -15, 1, 17, 16, 15, -1]
    }

    SQUARES = {
        A8: 0, B8: 1, C8: 2, D8: 3, E8: 4, F8: 5, G8: 6, H8: 7,
        A7: 16, B7: 17, C7: 18, D7: 19, E7: 20, F7: 21, G7: 22, H7: 23,
        A6: 32, B6: 33, C6: 34, D6: 35, E6: 36, F6: 37, G6: 38, H6: 39,
        A5: 48, B5: 49, C5: 50, D5: 51, E5: 52, F5: 53, G5: 54, H5: 55,
        A4: 64, B4: 65, C4: 66, D4: 67, E4: 68, F4: 69, G4: 70, H4: 71,
        A3: 80, B3: 81, C3: 82, D3: 83, E3: 84, F3: 85, G3: 86, H3: 87,
        A2: 96, B2: 97, C2: 98, D2: 99, E2: 100, F2: 101, G2: 102, H2: 103,
        A1: 112, B1: 113, C1: 114, D1: 115, E1: 116, F1: 117, G1: 118, H1: 119
    }

    /* 
      COMPROBAMOS QUE EL MOVIMIENTO QUE SE INTENTA ES VALIDO
      PARAMETROS:
      -JUGADOR ACTUAL
      -TIPO DE FICHA
      -CASILLA INICIAL
      -CASILLA FINAL
      */
    checkMovement(player, piece, from, to) {
        const offset = this.SQUARES[from] - this.SQUARES[to]

        switch (piece) {
            case "P":
                const pawnFrom = document.querySelector(`button[data-position="${from}"]`).firstElementChild
                const pawnTo = document.querySelector(`button[data-position="${to}"]`).firstElementChild

                for (let i = 0; i < this.PAWN_OFFSETS[player].length; i++) {
                    if (offset === this.PAWN_OFFSETS[player][i]) {
                        if (offset === 15 || offset === -15 || offset === 17 || offset === -17) {
                            if (pawnFrom && pawnTo) {
                                if (player === pawnTo.dataset.player) {
                                    return false
                                } else {
                                    this.checkAtack(pawnFrom, pawnTo)
                                }
                            }

                            return pawnTo ? true : false
                        }

                        if (offset === 16 || offset === -16 || offset === 32 || offset === -32) {
                            if ((offset === 32 || offset === -32) && pawnFrom.dataset.start === 'false') {
                                return false
                            }

                            if ((offset === 32 || offset === -32) && pawnFrom.dataset.start) {
                                const positionOffset = offset > 0 ? this.SQUARES[to] + 16 : this.SQUARES[to] - 16
                                const position = Object.keys(this.SQUARES).find((key) => this.SQUARES[key] === positionOffset)
                                pawnFrom.dataset.start = false
                                return document.querySelector(`button[data-position="${position}"]`).firstElementChild ? false : true
                            }

                            return pawnTo ? false : true
                        }

                        return false
                    }
                }
                break
            case "R":
                const rookFrom = document.querySelector(`button[data-position="${from}"]`).firstElementChild
                const rookTo = document.querySelector(`button[data-position="${to}"]`).firstElementChild

                for (let i = 0; i < this.PIECE_OFFSETS[piece].length; i++) {
                    if (offset === this.PIECE_OFFSETS[piece][i]) {
                        if (offset === 1 || offset === 2 || offset === 3 || offset === 4 || offset === 5 || offset === 6 || offset === 7) {
                            //const position = Object.keys(this.SQUARES).find((key) => this.SQUARES[key] === this.SQUARES[to])
                        }

                        if (offset === 16 || offset === 32 || offset === 48 || offset === 64 || offset === 80 || offset === 96 || offset === -16 || offset === -32 || offset === -48 || offset === -64 || offset === -80 || offset === -96) {
                            for (let i = 0; i < 8; i++) {
                                let positionOffset = 0
                                if(rookFrom.dataset.player === 'BLACK') {
                                    positionOffset = offset > 0 ? this.SQUARES[to] - (16 * i) : this.SQUARES[to] + (16 * i)
                                }

                                if(rookFrom.dataset.player === 'WHITE') {
                                    positionOffset = offset > 0 ? this.SQUARES[to] + (16 * i) : this.SQUARES[to] - (16 * i)
                                }
                                
                                const position = Object.keys(this.SQUARES).find((key) => this.SQUARES[key] === positionOffset)

                                if (!position) continue

                                console.log('positionOffset', positionOffset)
                                console.log('position', position)
                                console.log('from', from)
                                console.log('to', to)

                                if (position !== from) {
                                    if (position === to && !document.querySelector(`button[data-position="${position}"]`).firstElementChild) {
                                        console.log('AQUI NO HAY NADA')
                                        return true
                                    }

                                    if (position !== to && document.querySelector(`button[data-position="${position}"]`).firstElementChild) {
                                        console.log('AQUI HAY UNA FICHA!!!! -> ' + position)
                                        return false
                                    }

                                    if (position === to && document.querySelector(`button[data-position="${position}"]`).firstElementChild) {
                                        if (rookFrom.dataset.player === rookTo.dataset.player) {
                                            return false
                                        } else {
                                            console.log('Me estoy comiento una ficha!!! -> ' + position)
                                            this.checkAtack(rookFrom, rookTo)
                                        }
                                    }
                                }
                            }

                            return rookTo ? true : false
                        }
                        return false
                    }
                }
                break
            case "N":
            case "B":
            case "Q":
            case "K":
            default: return false;
        }
    }

    checkAtack(attacker, attacked) {
        if (attacker.dataset.player !== attacked.dataset.player) {
            const list = document.querySelector(`#${attacked.dataset.player.toLowerCase()}-kills`)
            const li = document.createElement('li')
            li.appendChild(attacked)
            li.setAttribute('class', `list-group-item ${attacked.dataset.player === 'WHITE' ? 'bg-dark' : 'bg-light'}`)

            list.appendChild(li)
            console.log("Atacando al enemigo!")
        }

    }

    /*****************************************************************************
     * UTILITY FUNCTIONS
     ****************************************************************************/
    rank(i) {
        return i >> 4;
    }
}

export default Movements