import './App.css'
import Users from './Components/Users'

const userPromise = fetch('http://localhost:3000/users').then(res=>res.json());

function App() {

  return (
    <>
      <h1>Simple CRAD Operation</h1>
      <Users userPromise={userPromise} />
    </>
  )
}

export default App
