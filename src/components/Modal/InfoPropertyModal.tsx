import { Modal, Button, ListGroup } from 'react-bootstrap'
import { Property } from '@models/property'
import formatDate from '@lib/formatDate'

interface PropertyModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedProperty: Property | null;
}

const InfoPropertyModal: React.FC<PropertyModalProps> = ({ showModal, setShowModal, selectedProperty }) => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Property Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProperty && (
          <ListGroup variant="flush">
            <ListGroup.Item><strong>ID Property:</strong> {selectedProperty.id_property}</ListGroup.Item>
            <ListGroup.Item><strong>Rent:</strong> {selectedProperty.rent} {selectedProperty.currency}</ListGroup.Item>
            <ListGroup.Item><strong>Type:</strong> {selectedProperty.type}</ListGroup.Item>
            <ListGroup.Item><strong>Surface Area:</strong> {selectedProperty.surface_area}</ListGroup.Item>
            <ListGroup.Item><strong>Postal Address:</strong> {selectedProperty.postal_address}</ListGroup.Item>
            <ListGroup.Item><strong>Created At:</strong> {formatDate(selectedProperty.created_at)}</ListGroup.Item>
            <ListGroup.Item><strong>Updated At:</strong> {formatDate(selectedProperty.updated_at)}</ListGroup.Item>
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

export default InfoPropertyModal