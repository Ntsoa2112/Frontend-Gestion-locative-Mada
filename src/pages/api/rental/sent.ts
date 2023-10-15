import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import extractTokenData from '@lib/extractCookie'

const apiUrl = process.env.NEXT_PUBLIC_API_MADA_LOCATIVE || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req

  if (cookies.auth) {
    const dataToken = extractTokenData(cookies.auth)

    try {
      const response = await axios.get(`${apiUrl}/tenant/rentByOwner/${dataToken?.ownerId}`, {
        headers: {
          Authorization: `Bearer ${dataToken?.access_token}`,
        }
      })

      res.status(200).json(response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response
        res.status(status).json({ error: data })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
