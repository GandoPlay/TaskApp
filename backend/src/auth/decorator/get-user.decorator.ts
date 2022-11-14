import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    console.log(data);
    
    if (data) {
      return request.user[data];
    }
    console.log(request);

    return request.user;
  },
);