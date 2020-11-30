import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts';
import authMiddleware from "../authMiddleware.ts";
import { markAttendance } from "../controllers/attendance.ts";
import { login } from "../controllers/login.ts";

const employee = new Router();

employee
    .post('/login', login)
    .get('/employee/attendance/:id', authMiddleware, markAttendance)

export default employee;