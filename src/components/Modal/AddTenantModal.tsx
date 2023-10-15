import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { Property } from '@models/property'

interface AddTenantModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  updateTenants: boolean;
  setUpdateTenants: (show: boolean) => void;
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({
  showModal,
  setShowModal,
  updateTenants,
  setUpdateTenants,
}) => {
  const [newTenant, setNewTenant] = useState({
    first_name: '',
    last_name: '',
    postal_address: '',
    email: '',
    telephone: '',
    id_property: '', // Ajout d'un champ pour stocker l'ID de la propriété associée
  })

  const [propertiesWithoutTenant, setPropertiesWithoutTenant] = useState<Property[]>([])

  useEffect(() => {
    const fetchPropertiesWithoutTenant = async () => {
      try {
        const response = await axios.get('api/property/withoutTenant')
        setPropertiesWithoutTenant(response.data)
      } catch (error) {
        console.error('Error fetching properties without tenant:', error)
      }
    }

    fetchPropertiesWithoutTenant()
  }, [showModal]) // Appel uniquement au montage du composant

  const [errorAdd, setErrorAdd] = useState<string | null>(null)

  const handleAdd = async () => {
    try {
      const response = await axios.post('api/tenant/addTenant', newTenant)
      if (response) {
        setUpdateTenants(!updateTenants)
        setNewTenant({
          first_name: '',
          last_name: '',
          postal_address: '',
          email: '',
          telephone: '',
          id_property: '',
        })
        setShowModal(false)
      }
    } catch (error) {
      setErrorAdd(`Error adding tenant: ${error}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTenant({
      ...newTenant,
      [name]: value,
    })
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tenant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={newTenant.first_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={newTenant.last_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPostalAddress">
            <Form.Label>Postal Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal address"
              name="postal_address"
              value={newTenant.postal_address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={newTenant.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formTelephone">
            <Form.Label>Telephone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter telephone"
              name="telephone"
              value={newTenant.telephone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProperty">
            <Form.Label>Property</Form.Label>
            <Form.Control
              as="select"
              name="id_property"
              value={newTenant.id_property}
              onChange={handleChange}
            >
              <option value="">Select a property</option>
              {propertiesWithoutTenant.map((property) => (
                <option key={property.id_property} value={property.id_property}>
                  {property.type} {property.postal_address}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      {errorAdd && <div className="mb-3 text-danger">{errorAdd}</div>}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add Tenant
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTenantModal
