//import dotenv from "dotenv";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";

//dotenv.config();

async function encrypt(unencryptedEntry, email, customId) {
  const customEntry = await encryptHash(customId, email);
  const primary = email + customId;
  const hash = SHA256(primary).toString();
  const encrypted = await AES.encrypt(unencryptedEntry, hash).toString();
  //console.log({ email, unencryptedEntry, customId, primary, hash, encrypted });
  return { entry: await encrypted, customEntry: await customEntry };
}

async function decrypt(encryptedEntry, email, customId) {
  customId = await decryptHash(customId, email);
  const primary = email + customId;
  const hash = SHA256(primary).toString();
  const bytes = AES.decrypt(encryptedEntry, hash);
  const decrypted = await bytes.toString(CryptoJS.enc.Utf8);
  //console.log({ email, customId, primary, hash, encryptedEntry, decrypted });
  return decrypted;
}

async function encryptHash(unEncryptedHash, email) {
  const primary = email + email;
  const hash = SHA256(primary).toString();
  const encrypted = await AES.encrypt(unEncryptedHash, hash).toString();
  //console.log({ email, unEncryptedHash, hash, encrypted });

  return encrypted;
}

async function decryptHash(encryptedHash, email) {
  const primary = email + email;
  const hash = SHA256(primary).toString();
  const bytes = AES.decrypt(encryptedHash, hash);
  const decrypted = await bytes.toString(CryptoJS.enc.Utf8);
  // console.log({ email, encryptedHash, hash, decrypted });

  return decrypted;
}

async function encryptPin(unEncryptedPin) {
  const primary = unEncryptedPin + ".";
  const hash = await SHA256(primary).toString();
  //console.log({ unEncryptedPin, hash });

  return hash;
}

export { encrypt, decrypt, encryptHash, decryptHash, encryptPin };
