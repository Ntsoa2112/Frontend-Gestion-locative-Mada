import type { NextApiRequest, NextApiResponse } from 'next'
import { serializeCookie } from '@lib'
import axios from 'axios'

const urlLogin = `${process.env.NEXT_PUBLIC_API_MADA_LOCATIVE}/auth/login` || ''
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  try {
    const response = await axios.post(urlLogin, {
      email,
      password
    })
    const cookie = serializeCookie('auth', {
      "ownerId": response.data.ownerId,
      "access_token": response.data.access_token
    }, { path: '/' })
    res.status(200)
      .setHeader('Set-Cookie', cookie)
      .json({ login: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const {status} = error.response
    const errorMessage = (error as Error).message // Convertir 'error' en type 'Error'
    res.status(status).json({ error: errorMessage })
  }
}
