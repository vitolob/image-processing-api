import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to Image Processing API!");
});

export default router;
