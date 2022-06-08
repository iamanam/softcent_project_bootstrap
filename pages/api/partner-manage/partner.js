import { addPartner, getpartner, deletePartner } from "./fn.partner";
import secureApi from "util/secureApiHandler";

export default async function handler(req, res) {
  return secureApi(req, res, {
    POST: addPartner,
    DELETE: deletePartner,
    GET: getpartner,
  });
}
