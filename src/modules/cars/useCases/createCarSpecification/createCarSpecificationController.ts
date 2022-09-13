import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return res.status(200).json(cars);
  }
}

export { CreateCarSpecificationController };
