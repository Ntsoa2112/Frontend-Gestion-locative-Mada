import { Modal, Button, ListGroup } from 'react-bootstrap'
import { TenantProperty } from '@models/property'
import formatDate from '@lib/formatDate'

interface PropertyModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedTenant: TenantProperty | null;
}

const InfoTenantModal: React.FC<PropertyModalProps> = ({ showModal, setShowModal, selectedTenant }) => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Tenant Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedTenant && (
          <ListGroup variant="flush">
            <ListGroup.Item><strong>First Name:</strong> {selectedTenant.tenant.first_name}</ListGroup.Item>
            <ListGroup.Item><strong>Last Name:</strong> {selectedTenant.tenant.last_name}</ListGroup.Item>
            <ListGroup.Item><strong>Postal Address (Tenant):</strong> {selectedTenant.tenant.postal_address}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong> {selectedTenant.tenant.email}</ListGroup.Item>
            <ListGroup.Item><strong>Telephone:</strong> {selectedTenant.tenant.telephone}</ListGroup.Item>
            <ListGroup.Item><strong>Created At (Tenant):</strong> {formatDate(selectedTenant.tenant.created_at)}</ListGroup.Item>
            <ListGroup.Item><strong>Updated At (Tenant):</strong> {formatDate(selectedTenant.tenant.updated_at)}</ListGroup.Item>

            <ListGroup.Item><strong>Rent:</strong> {selectedTenant.propertyOwner.rent} {selectedTenant.propertyOwner.currency}</ListGroup.Item>
            <ListGroup.Item><strong>Type:</strong> {selectedTenant.propertyOwner.type}</ListGroup.Item>
            <ListGroup.Item><strong>Surface Area:</strong> {selectedTenant.propertyOwner.surface_area}</ListGroup.Item>
            <ListGroup.Item><strong>Postal Address (Property):</strong> {selectedTenant.propertyOwner.postal_address}</ListGroup.Item>
            <ListGroup.Item><strong>Created At (Property):</strong> {formatDate(selectedTenant.propertyOwner.created_at)}</ListGroup.Item>
            <ListGroup.Item><strong>Updated At (Property):</strong> {formatDate(selectedTenant.propertyOwner.updated_at)}</ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )

export default InfoTenantModal
