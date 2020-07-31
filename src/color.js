import db from "./component/dbaccess";

async function Colors() {
  db.colors.toArray().then((val) => console.log(val));
}

export { Colors };
