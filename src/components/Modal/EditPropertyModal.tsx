import { Property } from '@models/property'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

interface EditPropertyModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedProperty: Property | null;
  updateProperties:boolean;
  setUpdateProperties: (show: boolean) => void;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
    showModal, setShowModal, selectedProperty, updateProperties, setUpdateProperties
}) => {
  const [editedProperty, setEditedProperty] = useState<Property | null>(null)
  const [errorEdit, setErrorEdit] = useState<string | null>(null)
  useEffect(() => {
    setEditedProperty(selectedProperty)
  }, [selectedProperty])

  const handleEdit = async () => {
    if (editedProperty) {
      try {
        const response = await axios.patch(`api/property/editProperty`, editedProperty)
        if (response) {
            setUpdateProperties(!updateProperties)
            setShowModal(false)
        }
      } catch (error) {
        setErrorEdit(`Error updating property :${error}`)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editedProperty && editedProperty) {
      setEditedProperty({
        ...editedProperty,
        updated_at: new Date(),
        [name]: value
      })
    }
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editedProperty && (
          <Form>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                name="type"
                value={editedProperty.type}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formRent">
              <Form.Label>Rent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rent"
                name="rent"
                value={editedProperty.rent}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter currency"
                name="currency"
                value={editedProperty.currency}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurfaceArea">
              <Form.Label>Surface Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surface area"
                name="surface_area"
                value={editedProperty.surface_area}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPostalAddress">
              <Form.Label>Postal Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal address"
                name="postal_address"
                value={editedProperty.postal_address}
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

export default EditPropertyModal
