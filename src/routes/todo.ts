import * as Joi from "@hapi/joi";
// import * as jwt from "jsonwebtoken";

import BaseRouteSimple from "xhelpers-api/lib/base-route-simple";
import { TodoService } from "../services/todo"

const httpResourcePath = "todos";

class TodoRoutes extends BaseRouteSimple {
  constructor() {
    super([httpResourcePath]);

    this.route("GET",`/api/${httpResourcePath}`,{
        description: "Search 'Todos'",
      },
      false
    )
      .validate({ query: todoQueryParams })
      .handler(async (r, h, u) => {
        return h.response(
          await new TodoService().queryAll({})
        ).code(200);
      })
      .build();

    this.route("GET", `/api/${httpResourcePath}/{id}`, {
        description: "Get 'Todo' by id",
      },
      false
    )
      .handler(async (r, h, u) => {
        return h.response(
          await new TodoService().queryAll({}, r.params)
        ).code(200);
      })
      .build();

    this.route("POST", `/api/${httpResourcePath}`, {
        description: "Create new 'Todo'",
      },
      false
    )
      .validate({ payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await new TodoService().create({}, r.payload)
          )
        .code(200);
      })
      .build();

    this.route("PATCH", `/api/${httpResourcePath}/{id}`, {
        description: "Update 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await new TodoService().update({}, r.params.id, r.payload)
          )
          .code(200);
      })
      .build();

    this.route("PUT", `/api/${httpResourcePath}/{id}`, {
        description: "Replace 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty, payload: todoCreatePayload })
      .handler(async (r, h, u) => {
        return h
          .response(
            await new TodoService().update({}, r.params.id, r.payload)
          )
          .code(200);
      })
      .build();

    this.route("DELETE", `/api/${httpResourcePath}/{id}`, {
        description: "Delete 'Todo' by id",
      },
      false
    )
      .validate({ params: this.defaultIdProperty })
      .handler(async (r, h, u) => {
        return h
          .response(
            await new TodoService().delete({}, r.params.id)
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
    .required()
    .default(false)
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
