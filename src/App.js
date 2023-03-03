import { useState } from 'react'
import './App.css';

function App() {
  const [ display, setDisplay] = useState('0')
  const [ equal, setEqual] = useState(false)
  const [operation, setOp] = useState(false)

  const handleNumber = (event) => {
    if (operation) {
      setOp(false)
    }

    let val = display
    if (val === '0') {
      val = ''
    }

    if (equal) {
      val = ''
      setEqual(false)
    }

    setDisplay(() => {
      return `${val}${event.target.dataset.number}`
    } )

  }

  const handleOp = (event) => {
    if (equal) {
      setEqual(false)
    }
    verOps(event.target.dataset.operator)
  }

  const verOps = (val) => {
    if (!operation) {
      setOp(true)
      setDisplay(() => {
        return `${display} ${val} `
      } )
      return 0
    }

    let lastOps = display.split(' ')
    changeOperationDisplay( lastOps, val)

  }

  const changeOperationDisplay = ( lastOps, val) => {
    let temp = [...lastOps]
 
    if ((operation && val !== '-') || temp.at(-2).length >= 2) {  
      temp[temp.length - 2] = val
    } else {
      temp[temp.length - 2] = temp.at(-2) + val
    }

    setDisplay(() => {
      return temp.join(' ')
    })
  }

  const handleEqual = () => {
    setEqual(true)
    const values = (display) => {
      return Function ('return ' + display)
    }
    // setDisplay(eval(display))
    setDisplay(values)
  }

  const handleDecimal = () => {
    const vals = display.split(' ')
    const act = vals.at(-1)
    let add = '.'

    if ( act.includes(".")){
      return
    }
    if ( act.length < 1) {
      add = '0.'
    }
    setDisplay(() => {
      return display + add
    })
    
  }

  const handleClear = () => {
    setDisplay( () => { return '0'})
  }

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row display">{display}</div>
        <div id="clear" className="row clear" onClick={handleClear}>
          AC
        </div>
        <div id="seven" className="pad" onClick={handleNumber} data-number={7} >7</div>
        <div id="eight" className="pad" onClick={handleNumber} data-number={8}>8</div>
        <div id="nine" className="pad" onClick={handleNumber} data-number={9}>9</div>
        <div id="multiply" className="pad" onClick={handleOp} data-operator='*' >*</div>
        <div id="four" className="pad" onClick={handleNumber} data-number={4}>4</div>
        <div id="five" className="pad" onClick={handleNumber} data-number={5}>5</div>
        <div id="six" className="pad" onClick={handleNumber} data-number={6}>6</div>
        <div id="divide" className="pad" onClick={handleOp} data-operator='/'>/</div>
        <div id="one" className="pad" onClick={handleNumber} data-number={1}>1</div>
        <div id="two" className="pad" onClick={handleNumber} data-number={2}>2</div>
        <div id="three" className="pad" onClick={handleNumber} data-number={3}>3</div>
        <div id="add" className="pad" onClick={handleOp} data-operator='+'>+</div>
        <div id="zero" className="pad" onClick={handleNumber} data-number={0}>0</div>
        <div id="decimal" className="pad" onClick={handleDecimal}>.</div>
        <div id="equals" className="pad equals" onClick={handleEqual}>=</div>
        <div id="subtract" className="pad" onClick={handleOp} data-operator='-'>-</div>
      </div>
    </div>
  )
}

export default App;
