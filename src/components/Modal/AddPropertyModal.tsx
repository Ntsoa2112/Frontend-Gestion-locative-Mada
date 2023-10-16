import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

interface AddPropertyModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  updateProperties: boolean;
  setUpdateProperties: (show: boolean) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  showModal,
  setShowModal,
  updateProperties,
  setUpdateProperties,
}) => {
  const [newProperty, setNewProperty] = useState({
    type: '',
    rent: 0,
    currency: '',
    surface_area: '',
    postal_address: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorAdd, setErrorAdd] = useState<string | null>(null)

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(`api/property/addProperty`, newProperty)
      if (response) {
        setUpdateProperties(!updateProperties)
        setNewProperty({
          type: '',
          rent: 0,
          currency: '',
          surface_area: '',
          postal_address: '',
        })
        setShowModal(false)
      }
    } catch (error) {
      setErrorAdd(`Error adding property: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProperty({
      ...newProperty,
      [name]: value,
    })
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter type"
              name="type"
              value={newProperty.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formRent">
            <Form.Label>Rent</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rent"
              name="rent"
              value={newProperty.rent}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter currency"
              name="currency"
              value={newProperty.currency}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSurfaceArea">
            <Form.Label>Surface Area</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surface area"
              name="surface_area"
              value={newProperty.surface_area}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPostalAddress">
            <Form.Label>Postal Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal address"
              name="postal_address"
              value={newProperty.postal_address}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {errorAdd && <div className="mb-3 text-danger">{errorAdd}</div>}
      <Modal.Footer>
  <Button variant="secondary" onClick={() => setShowModal(false)}>
    Cancel
  </Button>
  {!isLoading ? (
    <Button variant="primary" onClick={handleAdd} style={{ width: '50%' }}>
      Add Property
    </Button>
  ) : (
    <div className="d-flex justify-content-center w-50">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )}
</Modal.Footer>
    </Modal>
  )
}

export default AddPropertyModal
