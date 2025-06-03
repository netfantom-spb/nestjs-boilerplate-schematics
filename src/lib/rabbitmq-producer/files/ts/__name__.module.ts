/**
 * @summary <%= classify(name) %>Module
 * @version 1.0
 * @date <%= new Date().toISOString().split('T')[0] %>
 * @description RabbitMQ Producer Module
 */
import { Module } from '@nestjs/common';
import { MessagingModule } from '@/boilerplate/modules/messaging/messaging.module';
import { <%= classify(name) %>Service } from './<%= name %>.service';


@Module({
    providers: [<%= classify(name) %>Service,],
    imports: [MessagingModule],    
    exports: [<%= classify(name) %>Service,],
})
export class <%= classify(name) %>Module {}
