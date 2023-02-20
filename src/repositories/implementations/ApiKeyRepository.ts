import { PrismaClient } from '@prisma/client';

import { ApiKey } from '../../models/ApiKey';
import { IApiKeyRepository } from '../IApiKeyRepository';

export class ApiKeyRepository implements IApiKeyRepository {
  private prisma = new PrismaClient();

  async findByKey(key: string): Promise<ApiKey> | null {
    try {
      const obj = await this.prisma.apiKey.findFirst({
        where: {
          key: key,
        },
      });

      return obj || null;
    } catch (error) {
      throw new Error(error || 'Error during apikey query');
    } finally {
      await this.disconnectDB();
    }
  }

  async findAll(): Promise<Array<ApiKey>> {
    try {
      return this.prisma.apiKey.findMany();
    } catch (error) {
      throw new Error(error || 'Error during apikey query');
    } finally {
      await this.disconnectDB();
    }
  }

  async save(apikey: ApiKey): Promise<ApiKey> {
    try {
      return this.prisma.apiKey.create({
        data: {
          key: apikey.key,
          name: apikey.name,
        },
      });
    } catch (error) {
      throw new Error(error || 'Error during apikey creation');
    } finally {
      await this.disconnectDB();
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.prisma.apiKey.delete({
        where: {
          key: key,
        },
      });
      return;
    } catch (error) {
      throw new Error(error || 'Error during apikey deletion');
    } finally {
      await this.disconnectDB();
    }
  }

  private async disconnectDB(): Promise<void> {
    this.prisma.$disconnect();
  }
}
