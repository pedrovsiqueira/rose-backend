import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../configs/env';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { id } = decoded as ITokenPayload;

    request.user = { id };

    return next();
  } catch {
    return response.status(403).json({
      message: 'Você precisa estar logado para acessar esta rota',
    });
  }
};
