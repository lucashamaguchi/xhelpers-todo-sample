import Todo, { ITodo } from "../model/todo"; // mongoose or sequelize "Model"
import BaseServiceMongoose from "xhelpers-api/lib/base-service-mongoose";

// mongoose
export class TodoService extends BaseServiceMongoose<ITodo> {
  constructor() {
    super(Todo);
  }
  sentitiveInfo: any = ["-__v", "password"];
  protected async validate(entity: ITodo, payload: ITodo): Promise<boolean> {
    const invalid = false;
    if (invalid) throw new Error("Invalid payload.");
    return Promise.resolve(true);
  };
  protected parseSortAsJson(pagination: {
    offset: number;
    limit: number;
    sort: any;
  }) {
    if (!pagination.sort) return {};
    if (typeof pagination.sort === "object") return pagination.sort;

    let sortQuery: {};
    try {
      sortQuery = JSON.parse(pagination.sort);
    } catch (error) {
      console.log("Invalid sort parameter", error.message);
      throw 'Invalid parameter "sort", it MUST be a valid JSON / Mongo sort sintax';
    }
    return sortQuery;
  }
}
