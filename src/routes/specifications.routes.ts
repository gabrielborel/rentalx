import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  try {
    createSpecificationController.handle(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  return res.status(201).send();
});

export { specificationsRoutes };
