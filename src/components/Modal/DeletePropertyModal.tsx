import React, { useState } from 'react'
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap'
import { Property } from '@models/property'
import axios from 'axios'

interface DeletePropertyModalProps {
  property: Property;
  showModalDelete: boolean;
  setModalDelete: (show: boolean) => void;
  updateProperties:boolean;
  setUpdateProperties: (show: boolean) => void;
}

const DeletePropertyModal: React.FC<DeletePropertyModalProps> = ({
  property,
  showModalDelete,
  setModalDelete,
  updateProperties, setUpdateProperties
}) => {
    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const renderPropertyInfo = () => (
        <ListGroup variant="flush">
          <ListGroup.Item>Type: {property.type}</ListGroup.Item>
          <ListGroup.Item>Rent: {property.rent} {property.currency}</ListGroup.Item>
          <ListGroup.Item>Surface Area: {property.surface_area}</ListGroup.Item>
          <ListGroup.Item>Postal Address: {property.postal_address}</ListGroup.Item>
        </ListGroup>
    )
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`api/property/deleteProperty?id_property=${property.id_property}`)

            if (response) {
                setUpdateProperties(!updateProperties)
                setModalDelete(false)
            }
          } catch (error) {
            setErrorDelete(`Deletion error: This property is currently rented by a tenant`)
          }
    }

  return (
    <Modal show={showModalDelete} onHide={() => {
        setErrorDelete(null)
        setModalDelete(false)
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Are you sure you want to delete this property?
        </Alert>
        {renderPropertyInfo()}
      </Modal.Body>
      {errorDelete && <div className="mb-3 text-danger">{errorDelete}</div>}
      <Modal.Footer>
        <Button variant="secondary" onClick={() =>  {
            setErrorDelete(null)
            setModalDelete(false)
        }}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePropertyModal
