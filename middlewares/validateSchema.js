export function validateSchema(req, res, next, schema) {
    const { user } = res.locals;

    const validation = schema.validate(user);

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    next();
}