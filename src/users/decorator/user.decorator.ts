import {createParamDecorator,ExecutionContext} from '@nestjs/common';



//  creating custom decorator,ExecutionContext gives you a request
export const CurrentUser = createParamDecorator(
    ( data : never , context : ExecutionContext ) => {
        const request = context.switchToHttp().getRequest();
       return request.currentUser;
    // return " who i m"
    }
)   