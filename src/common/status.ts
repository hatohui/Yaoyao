import { NextApiResponse } from "next";

export type ErrorMessage = {
  message: string;
  code: string | number;
};

export const NotAllowedMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Method Not Allowed",
  code: code || 405,
});

export const InternalErrorMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Internal Server Error",
  code: code || 500,
});

export const BadRequestMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Bad Request",
  code: code || 400,
});

export const NotFoundMessage = (msg?: string, code?: string): ErrorMessage => ({
  message: msg || "Not Found",
  code: code || 404,
});

export const ConflictMessage = (msg?: string, code?: string): ErrorMessage => ({
  message: msg || "Conflict",
  code: code || 409,
});

export const UnauthorizedMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Unauthorized",
  code: code || 401,
});

export const ForbiddenMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Forbidden",
  code: code || 403,
});

export const ServiceUnavailableMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Service Unavailable",
  code: code || 503,
});

export const GatewayTimeoutMessage = (
  msg?: string,
  code?: string
): ErrorMessage => ({
  message: msg || "Gateway Timeout",
  code: code || 504,
});

export const CustomErrorMessage = (
  msg: string,
  code: string | number
): ErrorMessage => ({
  message: msg,
  code,
});

export const sendError = (res: NextApiResponse, error: ErrorMessage) => {
  const statusCode = typeof error.code === "number" ? error.code : 500;
  return res.status(statusCode).json(error);
};

export const Status = (res: NextApiResponse) => ({
  Ok: (data: unknown) => res.status(200).json(data),
  Created: (data: unknown) => res.status(201).json(data),
  NoContent: () => res.status(204).end(),
  NotAllowed: (msg?: string, code?: string) =>
    sendError(res, NotAllowedMessage(msg, code)),
  InternalError: (msg?: string, code?: string) =>
    sendError(res, InternalErrorMessage(msg, code)),
  BadRequest: (msg?: string, code?: string) =>
    sendError(res, BadRequestMessage(msg, code)),
  NotFound: (msg?: string, code?: string) =>
    sendError(res, NotFoundMessage(msg, code)),
  Conflict: (msg?: string, code?: string) =>
    sendError(res, ConflictMessage(msg, code)),
  Unauthorized: (msg?: string, code?: string) =>
    sendError(res, UnauthorizedMessage(msg, code)),
  Forbidden: (msg?: string, code?: string) =>
    sendError(res, ForbiddenMessage(msg, code)),
  ServiceUnavailable: (msg?: string, code?: string) =>
    sendError(res, ServiceUnavailableMessage(msg, code)),
  GatewayTimeout: (msg?: string, code?: string) =>
    sendError(res, GatewayTimeoutMessage(msg, code)),
  CustomError: (msg: string, code: string | number) =>
    sendError(res, CustomErrorMessage(msg, code)),
});

export default Status;
