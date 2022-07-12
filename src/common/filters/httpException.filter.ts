import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common'

@Catch()
export class HttpExceptionFilters implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilters.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse()
        const request = context.getRequest()

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception

        this.logger.error(
            `Http Status Code: ${status} | Error message: ${JSON.stringify(
                message
            )}`
        )

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message,
        })
    }
}
