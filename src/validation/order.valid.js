import Joi from 'joi';


export const orderValid = (body) => {

    const orderSchema = Joi.object({
        userId: Joi.string().guid({ version: 'uuidv4' }).required(),
        items: Joi.array().items(
            Joi.object({
                bookId: Joi.string().guid({ version: 'uuidv4' }).required(),
                quantity: Joi.number().integer().positive().required()
            })
        ).required(),
        totalPrice: Joi.number().positive().required(),
        status: Joi.string().valid('pending', 'completed', 'canceled').required(),
    });


    const { error, value } = orderSchema.validate(body);

    if (error) {
        throw error.details;
    } else {
        return value
    }

}