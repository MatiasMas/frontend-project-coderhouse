import {schema} from "normalizr";

export const authorSchema = new schema.Entity("authors", {}, {idAttribute: "email"});

