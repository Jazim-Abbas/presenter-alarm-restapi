import * as bcrypt from "bcryptjs";

export async function passwordHash(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);

    return hash;
  } catch (err) {
    throw err;
  }
}
