import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

interface Error {
  message: string;
}

type AuthorizationResponse = void | Response<Error>;

export default (
  req: Request,
  res: Response,
  next: NextFunction
): AuthorizationResponse => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authorization.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token mal formatado' });
  }
  // return res.status(401).json({ message: 'Token inválido' });
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const { id } = decoded as TokenPayload;

    req.user = {
      id,
    };

    return next();
  } catch {
    return res
      .status(403)
      .json({ message: 'Você precisa estar logado para acessar esta rota' });
  }
};
