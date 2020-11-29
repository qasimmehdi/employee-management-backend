import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";

export interface Employee {
    name: string,
    fatherName: string,
    cnic: string,
    grade: string,
    joinDate: number,
    allowances: string,
    allowedLeaves: number,
    remainingLeaves: number,
    email: string,
    password: string,
    role: "employee",
}