import {schema} from "normalizr";
import {messageSchema} from "./message.schema.js";

export const chatSchema = new schema.Entity("chat", {
    messages: [messageSchema]
}, {idAttribute: "id"});