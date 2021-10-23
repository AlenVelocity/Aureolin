/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, HttpStatusCode } from './HttpStatus'

export class Exception extends Error {
    constructor(
        public data: any = 'Internal Server Error',
        public status: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        super(data)
    }
}

const generateHttpExceptionClass = (code: HttpStatusCode) => {
    const ExceptionClass = class extends Exception {
        constructor(data: any) {
            super(data, code)
        }
    }

    return ExceptionClass
}

export const BadRequestException = generateHttpExceptionClass(HttpStatus.BAD_REQUEST)
export const UnauthorizedException = generateHttpExceptionClass(HttpStatus.UNAUTHORIZED)
export const ForbiddenException = generateHttpExceptionClass(HttpStatus.FORBIDDEN)
export const NotFoundException = generateHttpExceptionClass(HttpStatus.NOT_FOUND)
export const MethodNotAllowedException = generateHttpExceptionClass(HttpStatus.METHOD_NOT_ALLOWED)
export const NotAcceptableException = generateHttpExceptionClass(HttpStatus.NOT_ACCEPTABLE)
export const ConflictException = generateHttpExceptionClass(HttpStatus.CONFLICT)
export const GoneException = generateHttpExceptionClass(HttpStatus.GONE)
export const PreconditionFailedException = generateHttpExceptionClass(HttpStatus.PRECONDITION_FAILED)
export const UnsupportedMediaTypeException = generateHttpExceptionClass(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
export const InternalServerException = generateHttpExceptionClass(HttpStatus.INTERNAL_SERVER_ERROR)
export const NotImplementedException = generateHttpExceptionClass(HttpStatus.NOT_IMPLEMENTED)
export const BadGatewayException = generateHttpExceptionClass(HttpStatus.BAD_GATEWAY)
export const ServiceUnavailableException = generateHttpExceptionClass(HttpStatus.SERVICE_UNAVAILABLE)
export const GatewayTimeoutException = generateHttpExceptionClass(HttpStatus.GATEWAY_TIMEOUT)
export const HttpVersionNotSupportedException = generateHttpExceptionClass(HttpStatus.HTTP_VERSION_NOT_SUPPORTED)
export const VariantAlsoNegotiatesException = generateHttpExceptionClass(HttpStatus.VARIANT_ALSO_NEGOTIATES)
export const InsufficientStorageException = generateHttpExceptionClass(HttpStatus.INSUFFICIENT_STORAGE)
export const BandwidthLimitExceededException = generateHttpExceptionClass(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED)
export const NotExtendedException = generateHttpExceptionClass(HttpStatus.NOT_EXTENDED)
export const NetworkAuthenticationRequiredException = generateHttpExceptionClass(
    HttpStatus.NETWORK_AUTHENTICATION_REQUIRED
)
