import crypto from 'crypto';

export default {
  hashPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  },
  generateSalt(size = 16): string {
    return crypto.randomBytes(size).toString('hex');
  },
  validPassword(password: string, hashedPassword: string, salt: string) {
    const valid = this.hashPassword(password, salt);
    return valid === hashedPassword;
  },
};
