import { useEffect, useState } from "react"
function App() {

  const [users, setUsers] = useState([]);
  
  useEffect( () => {
    fetch('http://127.0.0.1:8000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, []);

  return (
    <>
    <div>
      <h1>User List</h1>

      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

    </div>
    </>
  )
}

export default App
