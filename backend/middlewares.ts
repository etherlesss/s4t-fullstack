import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

export interface CustomRequest extends Request {
  token: { mail: string; rol: number };
}

function authGuard(req: Request, res: Response, next: NextFunction): void {
  const authorizationHeader = req.header('authorization');
  if (!authorizationHeader) {
    res.status(401).send({
      message: 'Error: No se ha recibido el token de autenticación',
    });
    return;
  }
  const token = authorizationHeader.replace('Bearer ', '');
  try {
    const decoded: { mail: string; rol: number } = jwt.verify(
      token,
      SECRET_KEY,
    ) as { mail: string; rol: number };
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Error: Token de autenticación inválido',
    });
    return;
  }
}

function adminGuard(req: Request, res: Response, next: NextFunction): void {
  const token = (req as CustomRequest).token;
  console.log(token);
  if (token.rol !== 1) {
    res.status(403).send({
      message: 'Error: No tienes permisos de administrador',
    });
    return;
  }
  next();
}

export default {
  authGuard,
  adminGuard,
};
