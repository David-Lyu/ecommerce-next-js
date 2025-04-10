import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Enums for .env properties
const ROUTEHASH = "ROUTE_HASH";
const keys = ["API_TYPE", "PORT", ROUTEHASH];

function createHash() {
  return bcrypt.hashSync(Date.now().toString(), bcrypt.genSaltSync(10));
}

(function () {
  const hash = createHash();
  let envBuffer = "";

  //Thinking this is faster than reading buffer getting point and replacing. (More memory)
  for (let i = 0; i < keys.length; i++) {
    if (process.env[keys[i]]) {
      if (keys[i] === ROUTEHASH) {
        envBuffer += ROUTEHASH + " = " + hash;
      } else {
        envBuffer += keys[i] + " = " + process.env[keys[i]] + "\n";
      }
    }
  }

  if (envBuffer) {
    const appDir = path.resolve(import.meta.dirname + "/../..");
    const fileName = "/.env";

    try {
      fs.truncateSync(appDir + fileName);
      fs.writeFileSync(appDir + fileName, envBuffer, { flag: "r+" });
    } catch (err) {
      console.error(err);
    }
  }
})();
