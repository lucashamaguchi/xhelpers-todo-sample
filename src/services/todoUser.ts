import Todo, { ITodo } from "../model/todoUser"; // mongoose or sequelize "Model"
import BaseServiceMongoose from "xhelpers-api/lib/base-service-mongoose";
import * as Boom from "@hapi/boom";

// mongoose
export class TodoService extends BaseServiceMongoose<ITodo> {
  protected sentitiveInfo: any = ["-__v"];
  constructor() {
    super(Todo);
  }
  protected async validate(entity: ITodo, payload: ITodo): Promise<boolean> {
    const invalid = false;
    if (invalid) throw new Error("Invalid payload.");
    return Promise.resolve(true);
  };

  public async getById(
    user: any,
    id: any,
    projection: any = [],
    populateOptions: { path: string | any; select?: string | any } = {
      path: ".",
      select: ["-__v"],
    }
  ) {
    const entity = await super.getById(user, id, projection, populateOptions);
    if(!entity || entity.createdBy !== user._id) throw Boom.notFound("Todo not found");
    return entity;
  }

  public async update(user, id, payload) {
    const entity = await this.Model.findById(id) as ITodo;
    if (!entity || user._id !== entity.createdBy) throw Boom.notFound("Todo not found");
    return await super.update(user, id, { ...payload });
  }

  public async delete(user: any, id: any): Promise<void> {
    const entity = await this.Model.findById(id).lean() as ITodo;
    if (!entity || user._id !== entity.createdBy) throw Boom.notFound("Todo not found");
    await this.Model.deleteOne({ _id: id });
  }
}
