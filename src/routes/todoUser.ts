import * as Joi from "@hapi/joi";

import BaseRoute from "xhelpers-api/lib/base-route";
import { TodoService } from "../services/todoUser";

const httpResourcePath = "todos/user";

class TodoRoutes extends BaseRoute<TodoService> {
  constructor() {
    super(new TodoService(), [httpResourcePath]);

    this.route("GET",`/api/${httpResourcePath}`,{
        description: "Search 'Todos'",
      },
      true
    )
      .validate({ query: todoQueryParams })
      .handler(async (r, h, u) => {
        return h.response(
          await this.service.queryAll(u, { filter: {
            ...r.query,
            createdBy: u._id
          }, fields: ["-__v"] })
        ).code(200);
      })
      .build();

    this.route("GET", `/api/${httpResourcePath}/{id}`, {
        description: "Get 'Todo' by id",
      },
      true
    )
      .handler(async (r, h, u) => {
        return h.response(
          await this.service.getById(u, r.params.id, [], {
            path: ".",
          })
        ).code(200);
      })
      .build();

    this.route("POST", `/api/${httpResourcePath}`, {
        description: "Create new 'Todo'",
      },
      true
    )
      .validate({ payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await this.service.create(u, r.payload)
          )
        .code(200);
      })
      .build();

    this.route("PATCH", `/api/${httpResourcePath}/{id}`, {
        description: "Update 'Todo' by id",
      },
      true
    )
      .validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await this.service.update(u, r.params.id, r.payload)
          )
          .code(200);
      })
      .build();

    this.route("PUT", `/api/${httpResourcePath}/{id}`, {
        description: "Replace 'Todo' by id",
      },
      true
    )
      .validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await this.service.update(u, r.params.id, r.payload)
          )
          .code(200);
      })
      .build();

    this.route("DELETE", `/api/${httpResourcePath}/{id}`, {
        description: "Delete 'Todo' by id",
      },
      true
    )
      .validate({ params: this.defaultIdProperty })
      .handler(async (r, h, u) => {
        return h
          .response(
            await this.service.delete(u, r.params.id)
          )
          .code(200);
      })
      .build();
  }
}

// ****
// Validation Joi

const todoBase = Joi.object({
  task: Joi.string()
    .description("Title"),
  description: Joi.string()
    .description("Description"),
  done: Joi.boolean()
    .description("Todo is done"),
});

const todoQueryParams = todoBase;

const todoCreatePayload = todoBase.keys({
  task: Joi.string()
    .required()
    .description("Title"),
  description: Joi.string()
    .required()
    .description("Description"),
  done: Joi.boolean()
    .required()
    .default(false)
    .description("Todo is done"),
})
  .description("Todo payload")
  .label("TodoPayload");

module.exports = [...new TodoRoutes().buildRoutes()];
