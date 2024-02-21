export type ErrorMessageType = {
  code: number;
  message: string;
};

// 에러 계층은 1계층으로
export namespace ERROR_MESSAGE {
  export interface E {
    code: 400;
    message: 'hi';
  }
}
