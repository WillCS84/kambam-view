import { saveTaskMongoDb } from "@/database/Controllers/TaskController"
import { Request, Response } from "express"

export default async function handler(req: Request, res: Response) {
  console.log("req", req.body)
  const response = await saveTaskMongoDb(req.body)
    .then((data) => {})
    .catch((err) => console.log("error", err))

  res.status(200).json(response)
}
