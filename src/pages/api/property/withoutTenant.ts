import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import extractTokenData from '@lib/extractCookie'

const urlPropertyWithoutTenant = `${process.env.NEXT_PUBLIC_API_MADA_LOCATIVE}/tenant/propertyWithoutTenant/` || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {cookies} = req
  if (cookies.auth) {
    const dataToken = extractTokenData(cookies.auth)
    try {
      const response = await axios.get(`${urlPropertyWithoutTenant}${dataToken?.ownerId}`, {
        headers: {
          Authorization: `Bearer ${dataToken?.access_token}`,
        }
      })
      res.status(200)
      .json(response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const {status} = error.response
      const errorMessage = (error as Error).message // Convertir 'error' en type 'Error'
      res.status(status).json({ error: errorMessage })
    }
  }
}

