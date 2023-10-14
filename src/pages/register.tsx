import { NextPage } from 'next'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Card, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'

const Register: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorLogin, setErrorLogin] = useState<string | null>(null)

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const register = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const passwordRepeat = formData.get('password_repeat') as string
    if (password !== passwordRepeat) {
      setErrorLogin("Les mots de passe ne correspondent pas")
      setSubmitting(false)
      return
    }
    try {
      const response = await axios.post('api/mock/register', {
        email,
        password,
        firstName,
        lastName
      })

      if (response.status === 200) {
        router.push(getRedirect())
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorLogin("An error has occurred. Please try again later.")
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Register</h1>
                <p className="text-black-50">Create your account</p>

                <form onSubmit={register}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      name="firstName"
                      required
                      disabled={submitting}
                      placeholder="First name"
                      aria-label="First name"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      name="lastName"
                      required
                      disabled={submitting}
                      placeholder="Last name"
                      aria-label="Last name"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      disabled={submitting}
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      disabled={submitting}
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password_repeat"
                      required
                      disabled={submitting}
                      placeholder="Repeat password"
                      aria-label="Repeat password"
                    />
                  </InputGroup>
                  {errorLogin && <div className="mb-3 text-danger">{errorLogin}</div>}
                  <Button type="submit" className="d-block w-100" disabled={submitting} variant="success">
                    Create Account
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
