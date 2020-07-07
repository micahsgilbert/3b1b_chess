import React from 'react'
import "./App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      bits: [],
      target_bits: [],
      selection: false
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.state.board.push({x: j, y: i, color: Boolean((9*i + j + 1) % 2), flipped: Boolean(Math.floor(Math.random() * 2)), greenHighlight: false})
      }
    }


    this.registerClick = this.registerClick.bind(this)
    this.getCurrentValue = this.getCurrentValue.bind(this)
    this.selectGroup = this.selectGroup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.calculate = this.calculate.bind(this)
    this.clearHighlights = this.clearHighlights.bind(this)
    this.enterSelectionMode = this.enterSelectionMode.bind(this)
    this.randomizeTiles = this.randomizeTiles.bind(this)
    this.setAllCoins = this.setAllCoins.bind(this)
  }

  componentDidMount() {
    this.getCurrentValue()
  }

  registerClick(x,y) {
    if (this.state.selection) {
      this.setState({selection: false, target_bits: (8*y + x).toString(2).padStart(6,"0")})
      setTimeout(this.calculate, 50)
    }
    else {
      let newBoard = this.state.board
      newBoard[y*8 + x].flipped = !newBoard[y*8 + x].flipped
      this.setState({board: newBoard})
      this.getCurrentValue()
    }
  }

  getParity(bits) {
    let reducer = (a,bit) => {
      return a + (bit.flipped ? 1 : 0)
    }
    return bits.reduce(reducer,0) % 2
  }

  selectGroup(group,board) { // count bits rtl
    switch(group) {
      case 0:
        return board.filter(b => (((b.y*8 + b.x) % 2) === 1))
      case 1:
        return board.filter(b => ([2,3,6,7].includes((b.y*8 + b.x) % 8)))
      case 2:
        return board.filter(b => (((b.y*8 + b.x) % 8) >= 4))
      case 3:
        return board.filter(b => (((b.y + b.x*8) % 2) === 1))
      case 4:
        return board.filter(b => ([2,3,6,7].includes((b.y + b.x*8) % 8)))
      case 5:
        return board.filter(b => (((b.y + b.x*8) % 8) >= 4))
      default:
        return []
    }
  }

  getCurrentValue() {
    let bits = []
    for (let i = 0; i < 6; i++) {
      bits.unshift(this.getParity(this.selectGroup(i, this.state.board)))
    }

    this.setState({bits})
  }

  calculate() {
    if (this.state.target_bits.length !== 6) {
      return
    }
    this.clearHighlights()

    let bitsToFlip = []

    for (let i = 0; i < 6; i++) {
      if (this.state.bits[i].toString() === this.state.target_bits[i]) {
        bitsToFlip.push(0)
      } else {
        bitsToFlip.push(1)
      }
    }

    let pos = parseInt(bitsToFlip.join(""),2)

    let board = this.state.board
    board[pos].greenHighlight = true;
    this.setState({board})
  }

  clearHighlights() {
    let board = this.state.board
    board.forEach(b => b.greenHighlight = false)
    board.forEach(b => b.orangeHighlight = false)
    this.setState(board)
  }

  enterSelectionMode() {
    this.setState({selection: true})
  }

  setAllCoins() {
    let board = this.state.board
    for (let i = 0; i < 64; i++) {
      board[i].flipped = 0
    }
    this.setState({board})
    setTimeout(this.getCurrentValue, 50)
  }

  randomizeTiles() {
    let board = this.state.board
    for (let i = 0; i < 64; i++) {
      board[i].flipped = Math.floor(2 * Math.random())
    }
    this.setState({board})
    setTimeout(this.getCurrentValue, 50)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    return (<div id="app">
      <div id="sidebar">
        <h2>3Blue1Brown Chessboard Puzzle</h2>
        <hr />
        <br />
        <button onClick={this.randomizeTiles}>Randomize Coins</button>
        <br />
        <button onClick={() => {this.setAllCoins()}}>Set All Coins to Heads</button>
        <h3>Current Encoded Position</h3>
        <div className="textarea-container">
          <textarea rows={1} cols={6} maxLength={6} disabled={true} value={this.state.bits.join("")}>
          </textarea>
        </div>
        <hr />
        <br />
        <h3>Position to Encode</h3>
        <button onClick={this.enterSelectionMode} id="selection-mode-button">Select Tile</button>
        <div className="textarea-container">
          <textarea id="target_bits" rows={1} cols={6} maxLength={6} onChange={this.handleChange} value={this.state.target_bits}></textarea>
        </div>
        <hr />
        <h3>Explanation</h3>
        <p>The tile in <span style={{color: "orange"}}>orange</span> is the tile that is currently encoded by the state of the board. When you input a position to encode, either by typing in the binary or by clicking the button then a tile, a coin will show up in <span style={{color: "green"}}>green.</span> When you flip that coin, the state of the board will change to the requested position.</p>
        <hr />
        <h3>Videos</h3>
        <iframe src="https://www.youtube.com/embed/as7Gkm7Y7h4" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="standupmaths"></iframe>
        <iframe src="https://www.youtube.com/embed/wTJI_WuZSwE" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="3b1b"></iframe>
      </div>
      <div id="board-container">
        <div id="board">
          {this.state.board.map(b => 
            <div className="tile"
              onClick={() => this.registerClick(b.x,b.y)}
              style={{backgroundColor: b.color ? "#555555" : "#333333", outline: ((8*b.y + b.x) === parseInt(this.state.bits.join(""), 2)) && "3px solid orange"}}
              key={8*b.y + b.x}
              >
              <div className="coin"
                style={{backgroundColor: b.flipped ? "#222222" : "#999999", border: b.greenHighlight && "3px solid green"}}
              >
              </div>
            </div>
          )}
        </div>
      </div>
    </div>)
  }
}