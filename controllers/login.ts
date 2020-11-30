import { create, getNumericDate, Header, Payload } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { Context } from "https://deno.land/x/oak@v6.3.2/context.ts";
import key from "../key.ts";
import db from "../db.ts";
import { Collection } from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";

const employees: Collection<any> = db.collection("employees");
const admins: Collection<any> = db.collection("admins");


export const login = async ({ request, response }: Context) => {
    const body = await request.body().value;
    const { email, password } = body;
    console.log(email, password);
    let employee = await employees.findOne({ email: email, password: password });
    console.log(employee);
    if (employee) {
        delete employee.password;
        const payload: Payload = {
            role: 'employee',
            id: employee._id.$oid,
            exp: getNumericDate(6000),
        };
        const header: Header = {
            alg: "HS256",
            typ: "JWT",
        };
        response.status = 200;

        const jwt = await create(header, payload, key);
        if (jwt) {
            response.status = 200;
            response.body = {
                employee,
                jwt,
                role: employee.role
            }
        } else {
            response.status = 500;
            response.body = {
                message: 'Internal server error'
            }
        }
        return;
    }
    else {
        let admin = await admins.findOne({ email: email, password: password });
        if (admin) {
        delete admin.password;
            const payload: Payload = {
                role: 'admin',
                id: admin._id.$oid,
                exp: getNumericDate(6000),
            };
            const header: Header = {
                alg: "HS256",
                typ: "JWT",
            };
            response.status = 200;

            const jwt = await create(header, payload, key);
            if (jwt) {
                response.status = 200;
                response.body = {
                    admin,
                    jwt,
                    role: admin.role
                }
            } else {
                response.status = 500;
                response.body = {
                    message: 'Internal server error'
                }
            }
            return;
        }
    }

    response.status = 401;
    response.body = {
        message: 'Invalid email or password'
    };
};