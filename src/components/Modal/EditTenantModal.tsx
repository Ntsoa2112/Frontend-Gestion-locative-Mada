import { TenantProperty } from '@models/property'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

interface EditTenantModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedTenant: TenantProperty | null;
  updateTenants: boolean;
  setUpdateTenants: (show: boolean) => void;
}

const EditTenantModal: React.FC<EditTenantModalProps> = ({
  showModal,
  setShowModal,
  selectedTenant,
  updateTenants,
  setUpdateTenants,
}) => {
  const [editedTenant, setEditedTenant] = useState<TenantProperty | null>(null)
  const [errorEdit, setErrorEdit] = useState<string | null>(null)

  useEffect(() => {
    setEditedTenant(selectedTenant)
  }, [selectedTenant])

  const handleEdit = async () => {
    if (editedTenant) {
      try {
        const response = await axios.patch(`api/tenant/editTenant`, {
          id_tenant: editedTenant.tenant.id_tenant,
          first_name: editedTenant.tenant.first_name,
          last_name: editedTenant.tenant.last_name,
          postal_address: editedTenant.tenant.postal_address,
          email: editedTenant.tenant.email,
          telephone: editedTenant.tenant.telephone,
          id_property: editedTenant.propertyOwner.id_property,
        })

        if (response) {
          setUpdateTenants(!updateTenants)
          setShowModal(false)
        }
      } catch (error) {
        setErrorEdit(`Error updating tenant: ${error}`)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editedTenant) {
      setEditedTenant({
        ...editedTenant,
        tenant: {
          ...editedTenant.tenant,
          [name]: value,
        },
      })
    }
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tenant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editedTenant && (
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="first_name"
                value={editedTenant.tenant.first_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={editedTenant.tenant.last_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPostalAddress">
              <Form.Label>Postal Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal address"
                name="postal_address"
                value={editedTenant.tenant.postal_address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedTenant.tenant.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTelephone">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter telephone"
                name="telephone"
                value={editedTenant.tenant.telephone}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      {errorEdit && <div className="mb-3 text-danger">{errorEdit}</div>}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTenantModal
