import {
    MongooseModuleOptions,
    MongooseOptionsFactory,
  } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService,) {
    console.log(this.config.get('MONGO_URL'));
  }
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get('MONGO_URL')
    };
  }
}