import React, { useState } from 'react'
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap'
import { TenantProperty } from '@models/property'
import axios from 'axios'

interface DeleteTenantModalProps {
  selectedTenant: TenantProperty;
  showModalDelete: boolean;
  setModalDelete: (show: boolean) => void;
  updateTenants: boolean;
  setUpdateTenants: (show: boolean) => void;
}

const DeleteTenantModal: React.FC<DeleteTenantModalProps> = ({
  selectedTenant,
  showModalDelete,
  setModalDelete,
  updateTenants,
  setUpdateTenants
}) => {
  const [errorDelete, setErrorDelete] = useState<string | null>(null)

  const renderTenantInfo = () => (
    <ListGroup variant="flush">
      <ListGroup.Item>First Name: {selectedTenant.tenant.first_name}</ListGroup.Item>
      <ListGroup.Item>Last Name: {selectedTenant.tenant.last_name}</ListGroup.Item>
      <ListGroup.Item>Postal Address: {selectedTenant.tenant.postal_address}</ListGroup.Item>
      <ListGroup.Item>Email: {selectedTenant.tenant.email}</ListGroup.Item>
      <ListGroup.Item>Telephone: {selectedTenant.tenant.telephone}</ListGroup.Item>
    </ListGroup>
  )

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`api/tenant/deleteTenant?id_tenant=${selectedTenant.tenant.id_tenant}`)

      if (response) {
        setUpdateTenants(!updateTenants)
        setModalDelete(false)
      }
    } catch (error) {
      setErrorDelete(`Deletion error: This tenant is currently associated with a property`)
    }
  }

  return (
    <Modal show={showModalDelete} onHide={() => {
      setErrorDelete(null)
      setModalDelete(false)
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Tenant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Are you sure you want to delete this tenant?
        </Alert>
        {renderTenantInfo()}
      </Modal.Body>
      {errorDelete && <div className="mb-3 text-danger">{errorDelete}</div>}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
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

export default DeleteTenantModal
