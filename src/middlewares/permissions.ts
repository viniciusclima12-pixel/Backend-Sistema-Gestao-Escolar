import { Request, Response, NextFunction } from "express";

type AuthenticatedUser = {
    id: number;
    cargo: string;
};

function getAuthenticatedUser(request: Request): AuthenticatedUser | undefined {
    return request.body?.user;
}

export function hasAdminPermission(request: Request): boolean {
    return getAuthenticatedUser(request)?.cargo === "ADMIN";
}

export function authorizeAuthenticated(request: Request, response: Response): boolean {
    if (getAuthenticatedUser(request)) {
        return true;
    }

    response.status(401).json("Não autenticado");
    return false;
}

export function hasAdminOrHimselfPermission(request: Request, userId: number): boolean {
    const user = getAuthenticatedUser(request);
    return user?.cargo === "ADMIN" || user?.id === userId;
}

export function authorizeAdmin(request: Request, response: Response): boolean {
    if (hasAdminPermission(request)) {
        return true;
    }

    response.status(403).json("Acesso negado");
    return false;
}

export function authorizeAdminOrHimself(
    request: Request,
    response: Response,
    userId: number
): boolean {
    if (hasAdminOrHimselfPermission(request, userId)) {
        return true;
    }

    response.status(403).json("Acesso negado");
    return false;
}

export function isAdmin(request: Request, response: Response, next: NextFunction) {
    if (hasAdminPermission(request)) {
        return next();
    }

    return response.status(403).json("Acesso negado");
}

export function isAdminOrHimself(request: Request, response: Response, next: NextFunction) {
    if (hasAdminOrHimselfPermission(request, Number(request.params.id))) {
        return next();
    }

    return response.status(403).json("Acesso negado");
}