import dotenv from "dotenv";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import db from "../component/dbaccess";
import SHA256 from "crypto-js/sha256";

dotenv.config();

async function encrypt(unencryptedEntry) {
  const email = await db.user.toArray().then((val) => {
    if (val.length !== 0) {
      const email = val[0].email;
      return email;
    }
  });
  console.log(email);
  console.log(unencryptedEntry);
  console.log(process.env);
  const hash = SHA256(process.env.PASSED_OUT + email).toString();
  console.log(hash);
  const encrypted = await AES.encrypt(unencryptedEntry, hash).toString();
  console.log(encrypted);
  return encrypted;
}

async function decrypt(encryptedEntry) {
  console.log(encryptedEntry);
  const email = await db.user.toArray().then((val) => {
    if (val.length !== 0) {
      const email = val[0].email;
      return email;
    }
  });
  const hash = SHA256(process.env.PASSED_OUT + email).toString();
  const bytes = AES.decrypt(encryptedEntry, hash);
  const decrypted = await bytes.toString(CryptoJS.enc.Utf8);
  console.log(decrypted);
  return decrypted;
}

export { encrypt, decrypt };
