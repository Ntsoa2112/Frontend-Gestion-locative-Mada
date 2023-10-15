import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import extractTokenData from '@lib/extractCookie'

const urlTenant = `${process.env.NEXT_PUBLIC_API_MADA_LOCATIVE}/tenant` || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ...newTenant } = req.body
    const { cookies } = req

    if (cookies.auth) {
      const dataToken = extractTokenData(cookies.auth)
      if (dataToken) {
        try {
          const response = await axios.post(urlTenant, newTenant, {
            headers: {
              Authorization: `Bearer ${dataToken.access_token}`,
            },
          })

          res.status(200).json(response.data)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const { status } = error.response
          const errorMessage = error.message
          res.status(status).json({ error: errorMessage })
        }
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
