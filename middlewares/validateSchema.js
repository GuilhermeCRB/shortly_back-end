export function validateSchema(req, res, next, schema) {
    const { sanitizedObject } = res.locals;

    const validation = schema.validate(sanitizedObject);

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    next();
}