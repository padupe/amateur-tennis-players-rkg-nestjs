import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilters } from './common/filters/httpException.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new HttpExceptionFilters())
    await app.listen(8080)
}
bootstrap()
