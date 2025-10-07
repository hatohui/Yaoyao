import { NextApiResponse } from "next";

export type ErrorMessage = {
  message: string;
  code: number;
};

export const NotAllowedMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Method Not Allowed",
  code: 405,
});

export const InternalErrorMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Internal Server Error",
  code: 500,
});

export const BadRequestMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Bad Request",
  code: 400,
});

export const NotFoundMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Not Found",
  code: 404,
});

export const ConflictMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Conflict",
  code: 409,
});

export const UnauthorizedMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Unauthorized",
  code: 401,
});

export const ForbiddenMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Forbidden",
  code: 403,
});

export const ServiceUnavailableMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Service Unavailable",
  code: 503,
});

export const GatewayTimeoutMessage = (msg?: string): ErrorMessage => ({
  message: msg || "Gateway Timeout",
  code: 504,
});

export const CustomErrorMessage = (
  msg: string,
  code: number
): ErrorMessage => ({
  message: msg,
  code,
});

export const sendError = (res: NextApiResponse, error: ErrorMessage) => {
  return res.status(error.code).json(error);
};

export const Status = (res: NextApiResponse) => ({
  Ok: (data: unknown) => res.status(200).json(data),
  Created: (data: unknown) => res.status(201).json(data),
  NoContent: () => res.status(204).end(),
  NotAllowed: (msg?: string) => sendError(res, NotAllowedMessage(msg)),
  InternalError: (msg?: string) => sendError(res, InternalErrorMessage(msg)),
  BadRequest: (msg?: string) => sendError(res, BadRequestMessage(msg)),
  NotFound: (msg?: string) => sendError(res, NotFoundMessage(msg)),
  Conflict: (msg?: string) => sendError(res, ConflictMessage(msg)),
  Unauthorized: (msg?: string) => sendError(res, UnauthorizedMessage(msg)),
  Forbidden: (msg?: string) => sendError(res, ForbiddenMessage(msg)),
  ServiceUnavailable: (msg?: string) =>
    sendError(res, ServiceUnavailableMessage(msg)),
  GatewayTimeout: (msg?: string) => sendError(res, GatewayTimeoutMessage(msg)),
  CustomError: (msg: string, code: number) =>
    sendError(res, CustomErrorMessage(msg, code)),
});

export default Status;
