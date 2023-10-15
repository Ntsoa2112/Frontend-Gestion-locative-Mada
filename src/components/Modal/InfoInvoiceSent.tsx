import React from 'react'
import { Modal } from 'react-bootstrap'

interface ModalInvoiceProps {
  show: boolean;
  setShowModal: (show: boolean) => void;
  content: string;
}

const ModalInvoice: React.FC<ModalInvoiceProps> = ({ show, setShowModal, content }) => (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Rent Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal.Body>
    </Modal>
  )

export default ModalInvoice
