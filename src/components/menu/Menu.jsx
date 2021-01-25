import React, { useState } from 'react'
import { useAuth } from "../../contexts/AuthContext"
import { Alert, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import './Menu.css'

const Menu = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    
    return (
    <div className="Menu">
        <nav>
          <ul>
              <li>
                  <Button variant="link" href="/dashboard">Perfil</Button>
              </li>
              <li>
                  <Button variant="link" onClick={handleLogout}>Sair</Button>   
              </li>
          </ul>
        </nav>
        <p><i class="fas fa-user-circle"></i> <strong>Usuário:</strong> {currentUser.email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <p><strong>Jornada:</strong> 09hs - 12hs - 13hs - 18hs<br />
        <strong>Máximo:</strong> 10hs/dia</p>
    </div>
    )
}

export default Menu;