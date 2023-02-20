import { User } from '../../models/User';
import { IUserRepository } from '../IUserRepository';

import { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async findByUsername(username: string): Promise<User> {
    try {
      const obj = await this.prisma.user.findFirst({
        where: {
          username,
        },
      });

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await this.disconnectDB();
    }
  }
  async findAll(): Promise<User[]> {
    try {
      const obj = await this.prisma.user.findMany();

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await this.disconnectDB();
    }
  }
  async save(user: User): Promise<User> {
    try {
      const obj = await this.prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: user.password,
          salt: user.salt,
        },
      });

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await this.disconnectDB();
    }
  }
  async update(username: string, user: User): Promise<User> {
    try {
      const obj = await this.prisma.user.update({
        where: {
          username,
        },
        data: {
          username: user.username,
          password: user.password,
          salt: user.salt,
        },
      });

      return obj || user;
    } catch (error) {
      throw Error(error);
    } finally {
      await this.disconnectDB();
    }
  }

  private async disconnectDB(): Promise<void> {
    this.prisma.$disconnect();
  }
}
