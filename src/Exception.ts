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

const generateHttpExceptionClass = (code: HttpStatusCode, _data?: any) => {
    const ExceptionClass = class extends Exception {
        constructor(data: any) {
            super(data || _data, code)
        }
    }
    return ExceptionClass
}

export const BadRequestException = generateHttpExceptionClass(HttpStatus.BAD_REQUEST, 'Bad Request')
export const UnauthorizedException = generateHttpExceptionClass(HttpStatus.UNAUTHORIZED, 'Unauthorized')
export const ForbiddenException = generateHttpExceptionClass(HttpStatus.FORBIDDEN, 'Forbidden')
export const NotFoundException = generateHttpExceptionClass(HttpStatus.NOT_FOUND, 'Not Found')
export const MethodNotAllowedException = generateHttpExceptionClass(HttpStatus.METHOD_NOT_ALLOWED, 'Method Not Allowed')
export const NotAcceptableException = generateHttpExceptionClass(HttpStatus.NOT_ACCEPTABLE, 'Not Acceptable')
export const ConflictException = generateHttpExceptionClass(HttpStatus.CONFLICT, 'Conflict')
export const UnprocessableEntityException = generateHttpExceptionClass(
    HttpStatus.UNPROCESSABLE_ENTITY,
    'Unprocessable Entity'
)
export const InternalServerErrorException = generateHttpExceptionClass(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Internal Server Error'
)
export const ServiceUnavailableException = generateHttpExceptionClass(
    HttpStatus.SERVICE_UNAVAILABLE,
    'Service Unavailable'
)
export const GatewayTimeoutException = generateHttpExceptionClass(HttpStatus.GATEWAY_TIMEOUT, 'Gateway Timeout')
export const HttpVersionNotSupportedException = generateHttpExceptionClass(
    HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    'HTTP Version Not Supported'
)
export const VariantAlsoNegotiatesException = generateHttpExceptionClass(
    HttpStatus.VARIANT_ALSO_NEGOTIATES,
    'Variant Also Negotiates'
)
export const InsufficientStorageException = generateHttpExceptionClass(
    HttpStatus.INSUFFICIENT_STORAGE,
    'Insufficient Storage'
)
export const LoopDetectedException = generateHttpExceptionClass(HttpStatus.LOOP_DETECTED, 'Loop Detected')
export const NotExtendedException = generateHttpExceptionClass(HttpStatus.NOT_EXTENDED, 'Not Extended')
export const NetworkAuthenticationRequiredException = generateHttpExceptionClass(
    HttpStatus.NETWORK_AUTHENTICATION_REQUIRED,
    'Network Authentication Required'
)
