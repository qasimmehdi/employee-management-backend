import { Employee } from "../models/employee.ts";
import { Context } from "https://deno.land/x/oak@v6.3.2/context.ts";
import { Collection } from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";
import db from "../db.ts";

const employees: Collection<any> = db.collection("employees");

export const addEmployee = async ({ request, response }: Context) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 422;
    response.body = {
      success: false,
      message: "No data provided",
    };
  }
  try {
    const employee: Employee = await body.value;
    employee.role = "employee";
    console.info(employee);
    const resp = await employees.insertOne(employee);
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

export const getEmployee = async ({ response }: Context) => {
  const data: Employee[] = await employees.find({})
  if (data) {
    response.body = data;
    response.status = 200;
  } else {
    response.body = 'not found';
    response.status = 204;
  }
}

export const deleteEmployee = async ({ response, params }: Context | any) => {
  try {
    const { id } = params
    const fetchedContact = await employees.findOne({ $oid: id })
    console.log(fetchedContact);
    if (fetchedContact) {
      await employees.deleteOne({
        _id: { $oid: id },
      })
      response.body = {
        success: true,
        body: `Emloyee with id: ${id} was deleted`,
      }
      response.status = 204
    }
  } catch (error) {
    response.body = {
      success: false,
      body: error.message,
    }
    response.status = 500
  }
}

export const updateEmployee = async ({
  request,
  response,
  params,
}: Context | any) => {
  try {
    const body = await request.body().value
    const { id } = params
    const fetchedFriend = await employees.findOne({ _id: { $oid: id } })

    if (fetchedFriend) {
      const { matchedCount } = await employees.updateOne(
        { _id: { $oid: id } },
        { $set: { ...body } }
      )
      if (matchedCount) {
        response.body = {
          success: true,
          body: `Updated employee with id: ${id}`,
        }
        response.status = 204
      }
    } else {
      response.body = {
        success: false,
        body: `No employee with id: ${id} found`,
      }
      response.status = 404
    }
  } catch (error) {
    response.body = {
      success: false,
      body: error.message,
    }
    response.status = 500
  }
}