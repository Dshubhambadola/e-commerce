import { register, login } from "./controller";

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

export default router;
