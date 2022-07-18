import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilters } from './common/filters/httpException.filter'
import * as formatTimeZone from 'moment-timezone'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new HttpExceptionFilters())

    Date.prototype.toJSON = function (): any {
        return formatTimeZone(this)
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DD HH:mm:ss.SSS')
    }

    await app.listen(8080)
}
bootstrap()
