import { FastifyRequest } from "fastify";


export function validateFields(fields: FieldConfig[]) {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (request: FastifyRequest, reply: any) {
            const body = request.body as any

            for(const { field, minLength, isEmail } of fields) {
                const value = body[field]

                if(!value) {
                    reply.code(400).send({ error: `Field ${field} is required` })
                    return
                }

                if(minLength && value.length < minLength) {
                    reply.code(400).send({ error: `Field ${field} must be at least ${minLength} characters long` })
                    return
                }

                if(isEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    reply.code(400).send({ error: `Field ${field} is not a valid email` })
                    return
                }

                return await originalMethod.apply(this, [request, reply])
            }
        }
    }
}