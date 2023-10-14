import type { NextPage } from 'next'
import {
  Card,
} from 'react-bootstrap'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { AdminLayout } from '@layout'
import Properties from '@components/Tables/Properties'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const Home: NextPage = () => (
    <AdminLayout>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  5 property
                </div>
                <div>Users</div>
              </div>
            </Card.Body>
          </Card>
        </div>
  
        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  $6.200 rent
                </div>
                <div>Income</div>
              </div>
            </Card.Body>
          </Card>
        </div>
  
        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  12 month
                </div>
                <div>Conversion Rate</div>
              </div>
            </Card.Body>
          </Card>
        </div>
  
        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  72 Bill
                </div>
                <div>Sessions</div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
  
      <Properties/>
    </AdminLayout>
  )
export default Home
