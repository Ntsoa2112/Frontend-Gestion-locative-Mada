import { faCode, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '@layout'
import formatDate from '@lib/formatDate'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import { RentByOwner } from '@models/property'
import ModalInvoice from '@components/Modal/InfoInvoiceSent'

function Rental() {
  const [invoices, setInvoices] = useState<RentByOwner[] | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<RentByOwner | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetInvoices = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/rental/sent')
      setInvoices(response.data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInfoClick = (invoice: RentByOwner) => {
    setSelectedInvoice(invoice)
    setShowModal(true)
  }

  useEffect(() => {
    handleGetInvoices()
  }, [])
  return (
    <AdminLayout>
    <div className="row">
    <div className="col-md-12">
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
          List of Sent Invoices
          </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table border mb-0">
              <thead className="table-light fw-semibold">
                <tr className="align-middle">
                  <th className="text-center">
                    <FontAwesomeIcon icon={faCode} fixedWidth />
                  </th>
                  <th>Date</th>
                  <th>Rent</th>
                  <th className="text-center">Surface area</th>
                  <th className="text-center">Postal_address</th>
                  <th aria-label="Action" />
                </tr>
              </thead>
              <tbody>
                {
                    invoices && invoices.length ? (
                        invoices.map((invoice, index) => (
                        <tr className="align-middle" key={`${invoice.id}` }>
                            <td className="text-center">
                                {index+1}
                            </td>
                            <td>
                                <div>{formatDate(invoice.created_at)} </div>
                                <div className="small text-black-50">
                                Type: {invoice.property.type}
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="float-start">
                                    <div className="fw-semibold">{invoice.property.rent} {invoice.property.currency}</div>
                                </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{invoice.property.surface_area} </div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{invoice.property.postal_address}</div>
                                </div>
                                </div>
                            </td>
                            <td>
                              <Button
                                variant="link"
                                className="rounded-0 text-black-50 shadow-none p-0"
                                onClick={() => handleInfoClick(invoice)}
                              >
                                <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                              </Button>
                            </td>

                        </tr>
                        ))
                    ) :  (
                      <tr>
                        <td colSpan={6} className="text-center">
                          {isLoading ? (
                            <div className="d-flex justify-content-center">
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            </div>
                          ) : null}
                        </td>
                      </tr>  
                    )
                }
                {
                  selectedInvoice && (
                    <ModalInvoice
                      show={showModal}
                      setShowModal={setShowModal}
                      content={selectedInvoice.content}
                    />
                  )
                }

              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
  </AdminLayout>
  )
}

export default Rental