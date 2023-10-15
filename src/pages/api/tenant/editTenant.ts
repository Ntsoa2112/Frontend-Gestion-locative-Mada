import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import extractTokenData from '@lib/extractCookie'

const urlTenantById = `${process.env.NEXT_PUBLIC_API_MADA_LOCATIVE}/tenant/` || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id_tenant, ...tenantData } = req.body
    const { cookies } = req

    if (cookies.auth) {
      const dataToken = extractTokenData(cookies.auth)

      try {
        const response = await axios.patch(`${urlTenantById}${id_tenant}`, tenantData, {
          headers: {
            Authorization: `Bearer ${dataToken?.access_token}`,
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
    res.status(405).json({ error: 'Method not allowed' })
  }
}
