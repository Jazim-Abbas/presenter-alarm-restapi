import { passwordHash } from "../utils/password-hash";


export async function passwordHashMiddleware(next) {
    const user = this;

    if (!user.password) return next();

    if (!user.isModified("password")) return next();

    try {
      user.password = await passwordHash(user.password);
    } catch (err) {
      next(err);
    }
}