import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Aquí se podrían agregar validaciones generales
  next();
};
