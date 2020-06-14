import Todo, { ITodo } from "../model/todo"; // mongoose or sequelize "Model"
import BaseServiceMongoose from "xhelpers-api/lib/base-service-mongoose";

// mongoose
export class TodoService extends BaseServiceMongoose<ITodo> {
  constructor() {
    super(Todo);
  }
  sentitiveInfo: any = ["-__v"];
  protected async validate(entity: ITodo, payload: ITodo): Promise<boolean> {
    const invalid = false;
    if (invalid) throw new Error("Invalid payload.");
    return Promise.resolve(true);
  };
  public async delete(user: any, _id: any): Promise<void> {
    const entity = await this.Model.findById(_id).lean();
    if (!entity) throw "Entity not found";
    await this.Model.deleteOne({ _id });
  };
}
