import * as mongoose from "mongoose";

export class XSchema<T = any> extends mongoose.Schema {
    constructor(definition?: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions) {
        if (definition?._meta) {
        throw "_meta is a reserved prop for xhelpers";
        }
        super({
        ...definition,
        _meta: {type: Object, default: () => {} }
        }, options)
    }
}
