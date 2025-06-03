/**
 * @summary <%= classify(name) %>Service
 * @version 1.0
 * @date <%= new Date().toISOString().split('T')[0] %>
 * @description RabbitMQ Producer Service
 */
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { MessagingService } from '@boilerplate/modules/messaging/messaging.service';
import { <%= classify(name) %>MessageDto } from './dto/<%= name %>.message.dto';

@Injectable()
export class <%= classify(name) %>Service {
    constructor(
        @InjectPinoLogger(<%= classify(name) %>Service.name)
        private readonly logger: PinoLogger,
        private readonly messagingService: MessagingService,
      ) {}


    async sendMessage(data: DeepPartial<<%= classify(name) %>MessageDto>) {
      const message = plainToInstance(<%= classify(name) %>MessageDto, data, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });

  
      await validateOrReject(message, {
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        always: false
      })
      .catch((errors) => {
        this.logger.error(errors);
        throw new Error('Message validation failed');
      })

      await this.messagingService.publishMessage({
        exchange: 'EXCHANGE-NAME',
        routingKey: 'ROUTING-KEY',
        message,
        options: {
          deliveryMode: 1
        }
      })
      .catch((error) => {
        this.logger.error(error);
        throw new Error('Failed to send message')
      });
  }
}
