import { faCode, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import formatDate from '@lib/formatDate'
import { Property } from '@models/property'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap'

function Properties() {
    const [properties, setProperties] = useState<Property[] | null>(null)
    const handleProperty = async() => {
        try {
            const reponse = await axios.get('api/property/listByOwner')
            setProperties(reponse.data)
        } catch (error) {
            setProperties(null)
        }
      
    }
    useEffect(() => {
      handleProperty()
    }, [])
  return (
    <div className="row">
    <div className="col-md-12">
      <Card>
        <Card.Header>
        My properties
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

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                                    <Dropdown.Item
                                    className="text-danger"
                                    href="#/action-3"
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