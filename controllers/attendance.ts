import db from "../db.ts";
import { Context } from "https://deno.land/x/oak@v6.3.2/context.ts";
import { Collection } from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";

const attendance: Collection<any> = db.collection("attendance");

export const markAttendance = async ({ response, params }: Context | any) => {

    try {
      const date = new Date().getTime();
      const employeeId = params.id;
      console.info('adding', date, employeeId);
      const resp = await attendance.insertOne({employeeId, date});
      console.log('added');
      console.info(resp);
      response.body = {
        success: true,
        body: {message: 'Attendance marked successfully'},
      };
      response.status = 200;
    } catch (error) {
      console.log(error);
      response.body = error;
      response.status = 500;
    }
  };
