import "https://deno.land/std@0.79.0/examples/welcome.ts";
import { Application } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import admin from "./routes/admin.ts";
import employee from './routes/employee.ts';
import * as flags from "https://deno.land/std@0.66.0/flags/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

app.use(admin.routes());
app.use(admin.allowedMethods());
app.use(employee.routes());
app.use(employee.allowedMethods());

await app.listen({ port: port });