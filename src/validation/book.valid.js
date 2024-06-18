import Joi from "joi";


export const bookvalid = (body) => {

    const bookSchema = Joi.object({
        title: Joi.string().required(),
        authorId: Joi.string().guid({ version: 'uuidv4' }).required(),
        genreId: Joi.string().guid({ version: 'uuidv4' }).required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().positive().required(),
        publishedDate: Joi.date().iso().required(),
        status: Joi.string().valid('available', 'out of stock', 'discontinued').required(),
        imageUrls: Joi.array().items(Joi.string()).required(),
        description: Joi.string().required()
      });

      const { error, value } = orderSchema.validate(body);

    if (error) {
        throw error.details;
    } else {
        return value
    }
}