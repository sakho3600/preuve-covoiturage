export interface ParamsInterface {
  template: string;
  email: string;
  fullname: string;
  templateId?: string;
  organization?: string;
  link?: string;
  [k: string]: any;
}

export type ResultInterface = void;

export const handlerConfig = {
  service: 'user',
  method: 'notify',
};

export const signature = `${handlerConfig.service}:${handlerConfig.method}`;
