import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GraphQLInfo = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();
        // const requestStrings: string[] = info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value);
        // const datas = info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection);
        
        // console.log(datas.map((selection: any) => {
        //     if (selection.selectionSet && selection.selectionSet.selections) {
        //         return selection.selectionSet.selections.map((selection: any) => selection.name.value);
        //     }
        // }));
        

        if(info) {
            return info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value);
        }

        return null;
    },
);