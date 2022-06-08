import Axios from "axios";

export function fetchpartner() {
  return Axios.get("/api/partner-manage/partner").then((result) => result.data);
}

export function delPartner(id) {
  return Axios.delete("/api/partner-manage/partner", {
    params: {
      id,
    },
  }).then((result) => result.data);
}
