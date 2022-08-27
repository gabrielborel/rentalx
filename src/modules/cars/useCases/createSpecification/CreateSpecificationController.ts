import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    try {
      this.createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
