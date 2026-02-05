import { Router } from "express";
import * as RS from "./registration.service.js";
import * as RV from "./registration.validation.js";
import { validation } from "../../middleware/validation.js";


const registrationRouter = Router();

registrationRouter.post("/register",validation(RV.registrationSchema),RS.register);
registrationRouter.get("/{:id}",validation(RV.getRegistrationSchema), RS.getRegistration);
registrationRouter.patch("/{:id}",validation(RV.updateRegistrationSchema) ,RS.updateRegistration);


export default registrationRouter