import { Context } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { verify } from "https://deno.land/x/djwt@v1.9/mod.ts"
import key from './key.ts'

const authMiddleware = async ({ request, response }: Context, next: any) => {
    console.log('Middleware running');
    const headers: Headers = request.headers;
    const authorization = headers.get('Authorization')
    if (!authorization) {
        response.status = 401;
        return;
    }
    const jwt = authorization.split(' ')[1];
    if (!jwt) {
        response.status = 401;
        response.body = { message: 'Authorization token not found' };
        return;
    }
    await verify(jwt, key, "HS256")
        .then(async (res) => {
            console.log(res);
            if (request.url.pathname.startsWith(`/${res.role}`)) {
                await next();
                return;
            } else {
                response.status = 401;
                response.body = { message: "Invalid role" };
                return;
            }
        })
        .catch((err: RangeError) => {
            response.status = 401;
            response.body = { message: err.message };
            console.log(err);
            return;
        });
    console.log('middleware ended');
}

export default authMiddleware;