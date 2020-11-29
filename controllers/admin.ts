import { Context } from "https://deno.land/x/oak@v6.3.2/context.ts";
import { Collection } from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";
import db from "../db.ts";
import { Admin } from "../models/admin.ts";

const admins: Collection<any> = db.collection("admins");

export const addAdmin = async ({ request, response }: Context) => {
    console.log('adding admin');
    const body = await request.body();
    if (!request.hasBody) {
        response.status = 422;
        response.body = {
            success: false,
            message: "No data provided",
        };
    }
    try {
        const admin: Admin = await body.value;
        admin.role = "admin";
        console.info(admin);
        const resp = await admins.insertOne(admin);
        console.info(resp);
        response.body = {
            success: true,
            body: resp,
        };
        response.status = 201;
    } catch (error) {
        console.log(error);
        response.body = error;
        response.status = 500;
    }
};