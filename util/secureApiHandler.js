import { getSession } from "next-auth/react";

/**
 *
 * This function will secure api that can only be handled by admins
 * In case no user is logged in it will return 501 response
 * If no method is found for a request then it will send 404 respose
 *
 * @export
 * @param {*} req - Requst object of api request
 * @param {*} res - response object from api request
 * @param {*} apiHandlers - Object containing values of functions and keys named with api method such as GET,DELETE,POST
 * @return {*}
 */
export default async function secureApi(req, res, apiHandlers) {
  // if no method is available for req method then send 404 response
  if (!apiHandlers[req.method]) {
    return res
      .status(404)
      .json({ msg: ` ${req.method} not found !! invalid request!` });
  }
  // get session and if user hasn't been logged then send invalid access response
  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({ ok: false, msg: "Unauth access!!" });

  return apiHandlers[req.method]({ req, res, session });
}
