import "https://deno.land/std@0.79.0/examples/welcome.ts";
import { Application } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import admin from "./routes/admin.ts";
import employee from './routes/employee.ts';


const app = new Application();

app.use(admin.routes());
app.use(admin.allowedMethods());
app.use(employee.routes());
app.use(employee.allowedMethods());

await app.listen({ port: 8000 });