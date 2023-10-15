import AddTenantModal from '@components/Modal/AddTenantModal'
import DeleteTenantModal from '@components/Modal/DeleteTenantModal'
import EditTenantModal from '@components/Modal/EditTenantModal'
import InfoTenantModal from '@components/Modal/InfoTenantModal'
import { faCode, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '@layout'
import formatDate from '@lib/formatDate'
import { TenantProperty } from '@models/property'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown } from 'react-bootstrap'

function TenantList() {
    const [tenants, setTenants] = useState<TenantProperty[] | null>(null)
    const [selectedTenant, setSelectedTenant] = useState<TenantProperty | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [updateTenants, setUpdateTenants] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleTenant = async() => {
        try {
            const reponse = await axios.get('api/tenant/list')
            setTenants(reponse.data)
        } catch (error) {
            setTenants(null)
        }
    }
    const handleInfoClick = (Tenant: TenantProperty) => {
      setSelectedTenant(Tenant)
      setShowModal(true)
    }
    const handleEditClick = (Tenant: TenantProperty) => {
      setSelectedTenant(Tenant)
      setShowEditModal(true)
    }
    const handleDeleteClick = (Tenant: TenantProperty) => {
      setSelectedTenant(Tenant)
      setShowDeleteModal(true)
    }
    const handleAddTenant = () => {
      setShowAddModal(true)
    }
    useEffect(() => {
      handleTenant()
    }, [updateTenants])
  return (
    <AdminLayout>
    <div className="row">
    <div className="col-md-12">
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
            My tenants
            <Button variant="link" onClick={() => handleAddTenant()}>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center">Telephone</th>
                  <th className="text-center">Postal address</th>
                  <th aria-label="Action" />
                </tr>
              </thead>
              <tbody>
                {
                    tenants && tenants.length ? (
                        tenants.map((tenantProperty, index) => (
                        <tr className="align-middle" key={tenantProperty.tenant.id_tenant}>
                            <td className="text-center">
                                {index+1}
                            </td>
                            <td>
                                <div>{tenantProperty.tenant.first_name} {tenantProperty.tenant.last_name}</div>
                                <div className="small text-black-50">
                                Registered: {formatDate(tenantProperty.tenant.created_at)}
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="float-start">
                                    <div className="fw-semibold">{tenantProperty.tenant.email} </div>
                                </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{tenantProperty.tenant.telephone}</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="clearfix">
                                <div className="text-center">
                                    <div className="fw-semibold">{tenantProperty.tenant.postal_address}</div>
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
                                    <Dropdown.Item onClick={() => handleInfoClick(tenantProperty)}>Info</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleEditClick(tenantProperty)}>Edit</Dropdown.Item>
                                    <Dropdown.Item
                                      className="text-danger"
                                      onClick={() => handleDeleteClick(tenantProperty)}
                                    >
                                    Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        ))
                    ) : null
                }
                {
                  selectedTenant && (
                    <>
                      <InfoTenantModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedTenant={selectedTenant}
                      />
                      <EditTenantModal
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        selectedTenant={selectedTenant}
                        updateTenants={updateTenants}
                        setUpdateTenants={setUpdateTenants}
                      />
                      <DeleteTenantModal
                        selectedTenant={selectedTenant}
                        showModalDelete={showDeleteModal}
                        setModalDelete={setShowDeleteModal}
                        updateTenants={updateTenants}
                        setUpdateTenants={setUpdateTenants}
                      />
                    </>
                  )
                }
                <AddTenantModal
                  showModal={showAddModal}
                  setShowModal={setShowAddModal}
                  updateTenants={updateTenants}
                  setUpdateTenants={setUpdateTenants}
                />
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

export default TenantList