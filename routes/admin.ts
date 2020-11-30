import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts';
import authMiddleware from "../authMiddleware.ts";
import { addAdmin } from "../controllers/admin.ts";
import { addEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employee.ts";

const admin = new Router();

admin
    .get('/admin/getAllEmployees', authMiddleware, getEmployee)
    .post('/admin/addEmployee', authMiddleware, addEmployee)
    .patch('/admin/updateEmployee/:id', authMiddleware, updateEmployee)
    .delete('/admin/deleteEmployee/:id', authMiddleware, deleteEmployee)
    .post('/admin', authMiddleware, addAdmin)

export default admin;