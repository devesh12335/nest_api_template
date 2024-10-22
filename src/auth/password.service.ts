// src/password/password.service.ts

import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private algorithm = 'aes-256-ctr';
  private iv = randomBytes(16); // Initialization vector for encryption

  /**
   * Encrypt a password using AES-256-CTR algorithm.
   * @param password - Password to be encrypted.
   * @returns Encrypted password and initialization vector.
   */
  async encryptPassword(password: string): Promise<{ encrypted: string; iv: string }> {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, this.iv);
    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
    return {
      encrypted: encrypted.toString('hex'),
      iv: this.iv.toString('hex'),
    };
  }

  /**
   * Decrypt an encrypted password using AES-256-CTR algorithm.
   * @param encrypted - The encrypted password (ciphertext).
   * @param iv - The initialization vector used during encryption.
   * @param password - The original password for key generation.
   * @returns Decrypted password.
   */
  async decryptPassword(encrypted: string, iv: string, password: string): Promise<string> {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  }

  /**
   * Hash a password using bcrypt.
   * @param password - Password to be hashed.
   * @returns Hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Compare a password with its hashed value using bcrypt.
   * @param password - Password in plain text.
   * @param hash - Hashed password to compare.
   * @returns True if passwords match, otherwise false.
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
