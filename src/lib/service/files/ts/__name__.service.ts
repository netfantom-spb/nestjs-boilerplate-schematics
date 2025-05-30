import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class <%= classify(name) %>Service {
    constructor(
        @InjectPinoLogger(<%= classify(name) %>Service.name)
        private readonly logger: PinoLogger) {}
}
