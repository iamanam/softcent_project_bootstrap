import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import lodash from "lodash";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");

type Partners = {
  id: number;
  name: string;
  offerPercent: string;
  location: string;
};

type Data = {
  partners: Partners[];
};

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

const adapter = new JSONFile<Data>(file);
export default new LowWithLodash(adapter);
