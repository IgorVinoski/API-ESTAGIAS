import { Request, Response } from 'express'
export async function teste(req: Request, res: Response) {
  try {
    return res.status(200).json({ message: 'funcionando' })
  } catch (e) {
    return res.status(400).send(e)
  }
}
