import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/return/:id",
  ensureAuthenticated,
  returnRentalController.handle
);

export { rentalRoutes };
