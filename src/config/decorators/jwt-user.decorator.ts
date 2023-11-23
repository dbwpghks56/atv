import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const qlContext = ctx.getContext();
        const qlReq = qlContext.req;

        if (qlReq.user) {
            return qlReq.user;
        }

        return null;
    },
);