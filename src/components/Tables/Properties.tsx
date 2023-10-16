import AddPropertyModal from '@components/Modal/AddPropertyModal'
import DeletePropertyModal from '@components/Modal/DeletePropertyModal'
import EditPropertyModal from '@components/Modal/EditPropertyModal'
import InfoPropertyModal from '@components/Modal/InfoPropertyModal'
import { faCode, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import formatDate from '@lib/formatDate'
import { Property } from '@models/property'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown, Spinner } from 'react-bootstrap'

function Properties() {
    const [properties, setProperties] = useState<Property[] | null>(null)
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [updateProperties, setUpdateProperties] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleProperty = async() => {
      setIsLoading(true)
      try {
          const reponse = await axios.get('api/property/listByOwner')
          setProperties(reponse.data)
      } catch (error) {
          setProperties(null)
      } finally {
        setIsLoading(false)
      }
      
    }
    const handleInfoClick = (property: Property) => {
      setSelectedProperty(property)
      setShowModal(true)
    }
    const handleEditClick = (property: Property) => {
      setSelectedProperty(property)
      setShowEditModal(true)
    }
    const handleDeleteClick = (property: Property) => {
      setSelectedProperty(property)
      setShowDeleteModal(true)
    }
    const handleAddProperty = () => {
      setShowAddModal(true)
    }
    useEffect(() => {
      handleProperty()
    }, [updateProperties])
  return (
    <div className="row">
    <div className="col-md-12">
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
            My properties
            <Button variant="link" onClick={() => handleAddProperty()}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table border mb-0">
              <thead className="table-light fw-semibold">
                <tr className="align-middle">
                  <th className="text-center">
                    <FontAwesomeIcon icon={faCode} fixedWidth />
                  </th>
                  <th>Type</th>
                  <th>Rent</th>
                  <th className="text-center">Surface area</th>
                  <th className="text-center">Postal address</th>
                  <th aria-label="Action" />
                </tr>
              </thead>
              <tbody>
                {
                    // eslint-disable-next-line no-nested-ternary
                    properties && properties.length ? (
                        properties.map((property, index) => (
                        <tr className="align-middle" key={property.id_property}>
                            <td className="text-center">
                                {index+1}
                            </td>
                            <td>
                                <div>{property.type}</div>
                                <div className="small text-black-50">
                                Registered: {formatDate(property.created_at)}
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="float-start">
                                    <div className="fw-semibold">{property.rent} {property.currency}</div>
                                </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{property.surface_area}</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{property.postal_address}</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="button"
                                    bsPrefix="btn"
                                    className="btn-link rounded-0 text-black-50 shadow-none p-0"
                                    id="action-user1"
                                >
                                    <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu align='start'>
                                    <Dropdown.Item onClick={() => handleInfoClick(property)}>Info</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleEditClick(property)}>Edit</Dropdown.Item>
                                    <Dropdown.Item
                                      className="text-danger"
                                      onClick={() => handleDeleteClick(property)}
                                    >
                                    Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        ))
                    ) : (
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
                  selectedProperty && (
                    <>
                      <InfoPropertyModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedProperty={selectedProperty}
                      />
                      <EditPropertyModal
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        selectedProperty={selectedProperty}
                        updateProperties={updateProperties}
                        setUpdateProperties={setUpdateProperties}
                      />
                      <DeletePropertyModal
                        property={selectedProperty}
                        showModalDelete={showDeleteModal}
                        setModalDelete={setShowDeleteModal}
                        updateProperties={updateProperties}
                        setUpdateProperties={setUpdateProperties}
                      />
                    </>
                  )
                }
                <AddPropertyModal
                  showModal={showAddModal}
                  setShowModal={setShowAddModal}
                  updateProperties={updateProperties}
                  setUpdateProperties={setUpdateProperties}
                />
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
  )
}

export default Properties