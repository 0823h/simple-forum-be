import { CustomSuccess } from '../../api/v1/middlewares/response.middleware';

declare global {
  namespace Express {
    export interface Response {
      onSuccess: (data: any, custom?: CustomSuccess) => any;
    }
    export interface Request {
      rawBody?: string;
    }
  }
}

export {};
