import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container fluid className="align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div>
          <a className="text-decoration-none" href="#">Gestion  </a>
          <a className="text-decoration-none" href="#">
            locative Mada
          </a>
          {' '}
          © 2023.
        </div>
      </Container>
    </footer>
  )
}
