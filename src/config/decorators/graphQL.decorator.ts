import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GraphQLInfo = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();

        if(info) {
            return info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value);
        }

        return null;
    },
);