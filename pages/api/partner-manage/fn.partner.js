import DB from "util/db.ts";

function getPartnerDataFromId(id) {}

function addSinglePartner(partnerItem) {
  return new Promise(async (resolve) => {
    try {
      return resolve({ ok: false, partnerItem });
    } catch (error) {
      console.error(error);
      return resolve({ ok: false, partnerItem });
    }
  });
}

export async function addPartner({ req, res, sendRowResult, session }) {
  try {
    if (req.body?.data) {
      let partnerData = req.body?.data;

      DB.data ||= { partners: [] };

      if (!partnerData.id) {
        partnerData["id"] = Math.random().toString(36).substr(5, 36);
        DB.data.partners.push(partnerData);
      } else {
        DB.chain
          .get("partners")
          .find({ id: partnerData.id })
          .assign(partnerData)
          .value();
      }
      //  console.log(req.body.data);
      await DB.write();
      return res.json({ ok: true, data: DB.data.partners[0] });
    }
  } catch (error) {
    console.error(error);
    return res.json({ ok: false });
  }
}

export async function getpartner({ req, res, sendRowResult }) {
  try {
    await DB.read();
    const partners = DB.data.partners;
    return sendRowResult ? partners : res.json(partners);
  } catch (error) {
    console.error(error);
  }
}

export async function deletePartner({ req, res }) {
  try {
    if (req.query.id) {
      console.log("deleting", req.query);

      DB.chain.get("partners").remove((item) => {
        console.log(item);
      });

      await DB.write();
      // await DB.write();
      return res.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
}
