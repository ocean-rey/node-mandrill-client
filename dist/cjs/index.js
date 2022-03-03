"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MailClient_mandrill, _MailClient_apiKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailClient = void 0;
const axios_1 = __importDefault(require("axios"));
const buildMergeVars = function (variables) {
    const returnableArray = [];
    // inspired by nadas map(v, i)
    for (let key in variables) {
        returnableArray.push({ name: key, content: variables[key] });
    }
    return returnableArray;
};
class MailClient {
    constructor(apiKey) {
        _MailClient_mandrill.set(this, axios_1.default.create({
            baseURL: "https://mandrillapp.com/api/1.0",
            headers: { Content: "Application/JSON" },
        }));
        _MailClient_apiKey.set(this, void 0);
        __classPrivateFieldSet(this, _MailClient_apiKey, apiKey, "f");
    }
    sendEmail({ recepient, variables, template, from, subject, sendAt }) {
        var _a, _b;
        const mergeVars = buildMergeVars(variables);
        const requestBody = {
            key: __classPrivateFieldGet(this, _MailClient_apiKey, "f"),
            template_name: template,
            template_content: [{}],
            message: {
                merge_language: "mailchimp",
                subject: subject,
                from_email: from.email,
                from_name: (_a = from.name) !== null && _a !== void 0 ? _a : "",
                global_merge_vars: mergeVars,
                send_at: (_b = sendAt === null || sendAt === void 0 ? void 0 : sendAt.toUTCString()) !== null && _b !== void 0 ? _b : null,
                to: [{ email: recepient }],
            },
        };
        return __classPrivateFieldGet(this, _MailClient_mandrill, "f").post("/messages/send-template", requestBody);
    }
}
exports.MailClient = MailClient;
_MailClient_mandrill = new WeakMap(), _MailClient_apiKey = new WeakMap();
