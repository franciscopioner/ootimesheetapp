import React from "react"
import { Card } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const { currentUser } = useAuth()

  return (
    <div className="cardItem">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            <i class="fas fa-user-circle"></i> Perfil do usuário</h2>
          <strong>Email:</strong> {currentUser.email}
          <p><strong>Jornada:</strong> 09hs - 12hs - 13hs - 18hs<br />
          <strong>Máximo:</strong> 10hs/dia</p>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Alterar dados cadastrais
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Voltar</Link>
      </div>
    </div>
  )
}
