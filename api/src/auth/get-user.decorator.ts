import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interfaces";
import * as Neode from "neode"

export const GetUser = createParamDecorator((_data, ctx:ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()    
    const userNode:Neode.Node<UserInterface> = request.user;
    return userNode;
})