import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendPasswordRecoveryMailController } from "@modules/accounts/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController";
import { Router } from "express";

const sendPasswordRecoveryMailController =
  new SendPasswordRecoveryMailController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();

passwordRoutes.post("/recovery", sendPasswordRecoveryMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
