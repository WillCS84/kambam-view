import database from "@/database/database"
import { Request, Response } from "express"

import { saveUserMongoDB } from "../../database/Controllers/UserController"

export default async function handler(req: Request, res: Response) {
  const response = await saveUserMongoDB(req.body)
    .then((data) => {})
    .catch((err) => console.log("error", err))

  res.status(200).json(response)
}
