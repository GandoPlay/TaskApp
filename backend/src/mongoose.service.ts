import {
    MongooseModuleOptions,
    MongooseOptionsFactory,
  } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private config: ConfigService,) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get('DATABASE_URL')
    };
  }
}