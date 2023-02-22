import { useState } from 'react'
import './App.css';

function App() {
  const [ display, setDisplay] = useState('0')
  const [ equal, setEqual] = useState(false)
  const [operation, setOp] = useState(false)

  const handleNumber = (event) => {
    // console.log(event.target.dataset.number)
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
    // console.log(display)
    console.log('op ', val)
    if (!operation) {
      setOp(true)
      // newOp(val)
      setDisplay(() => {
        return `${display} ${val} `
      } )
      return 0
    }
    console.log('pre ', display)
    let lastOps = display.split(' ')
    // console.log(display)
    // console.log(lastOps.slice( 0, lastOps.at(-3) ))
    // setDisplay( () => {
    //   // console.log('ant ', lastOps.slice(0, lastOps.length - 2))
    //   return lastOps.slice(0, lastOps.length - 2).join(' ')
    // },  changeOperationDisplay( lastOps, val))
    changeOperationDisplay( lastOps, val)

  }

  const changeOperationDisplay = ( lastOps, val) => {
    let temp = [...lastOps]
    console.log('temp ', temp)
    
    if ((operation && val !== '-') || temp.at(-2).length >= 2) {  
      temp[temp.length - 2] = val
    } else {
      temp[temp.length - 2] = temp.at(-2) + val
    }
    console.log('change temp ', temp)
    setDisplay(() => {
      return temp.join(' ')
    })
    // console.log(lastOps)
    // newOp(lastOps.at(-2) + val)
  }

  const newOp = (val) => {
    console.log('newop', val, display)
    setDisplay( () => {
      return `${display} ${val} `
    }, console.log('post ', display))
  }

  const handleEqual = () => {
    // console.log('equal ', display)
    setEqual(true)
    setDisplay(eval(display))
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
    // console.log('pre-clear ', display)
    setDisplay( () => { return '0'})
    // console.log('post-clear ', display)
  }

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">{display}</div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="seven" onClick={handleNumber} data-number={7} >7</div>
        <div id="eight" onClick={handleNumber} data-number={8}>8</div>
        <div id="nine" onClick={handleNumber} data-number={9}>9</div>
        <div id="multiply" onClick={handleOp} data-operator='*' >*</div>
        <div id="four" onClick={handleNumber} data-number={4}>4</div>
        <div id="five" onClick={handleNumber} data-number={5}>5</div>
        <div id="six" onClick={handleNumber} data-number={6}>6</div>
        <div id="divide" onClick={handleOp} data-operator='/'>/</div>
        <div id="one" onClick={handleNumber} data-number={1}>1</div>
        <div id="two" onClick={handleNumber} data-number={2}>2</div>
        <div id="three" onClick={handleNumber} data-number={3}>3</div>
        <div id="add" onClick={handleOp} data-operator='+'>+</div>
        <div id="zero" onClick={handleNumber} data-number={0}>0</div>
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="subtract" onClick={handleOp} data-operator='-'>-</div>
      </div>
    </div>
  )
}

export default App;
