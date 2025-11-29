import { Router } from "express";
import { getTeapot } from '../controllers/teapot.controller';

const router = Router();

router.get("/", getTeapot);

export default router;

