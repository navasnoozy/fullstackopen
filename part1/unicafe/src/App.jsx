import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = (good / all) * 100 || 0

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average.toFixed(1)}
        positive={positive.toFixed(1)}
      />
    </div>
  )
}

export default App
