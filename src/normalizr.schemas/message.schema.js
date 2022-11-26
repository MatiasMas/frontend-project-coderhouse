import {schema} from "normalizr";
import {authorSchema} from "./author.schema.js";

export const messageSchema = new schema.Entity("messages", {
    author: authorSchema
}, {idAttribute: "id"});