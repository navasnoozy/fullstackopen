import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

// ...[Menu, Footer, AnecdoteList components as in repo]

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return anecdote ? (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>Has {anecdote.votes} votes</p>
      <p>for more info, see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  ) : null
}

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  // 7.4/7.5: implement useField with reset support, see below
  // ...for simplicity here we'll use useState:
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ content, author, info, votes: 0 })
    setNotification(`a new anecdote "${content}" created!`)
    navigate('/')
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>content <input value={content} onChange={e => setContent(e.target.value)} /></div>
      <div>author <input value={author} onChange={e => setAuthor(e.target.value)} /></div>
      <div>url for more info <input value={info} onChange={e => setInfo(e.target.value)} /></div>
      <button>create</button>
    </form>
  )
}

function App() {
  const [anecdotes, setAnecdotes] = useState([
    { content: 'If it hurts, do it more often', author: 'Jez Humble', info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0, id: 1 },
    { content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', info: 'http://wiki.c2.com/?PrematureOptimization', votes: 0, id: 2 },
  ])
  const [notification, setNotification] = useState('')

  const addNew = anecdote => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification}/>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  )
}
