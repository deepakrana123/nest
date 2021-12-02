import { Observable} from 'rxjs';
import {UseInterceptors,NestInterceptor,ExecutionContext,CallHandler} from "@nestjs/common";
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
// import {UserDto} from "../users/dtos/user.dto";

//  this means any call can be a type for serailze , searilze gives error when the type of passing data is different
interface ClassConstructor{
    new (...args :any[])
}
export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));



}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}


    intercept(context:ExecutionContext , handler:CallHandler):Observable<any>{
        // run something before a request is hnadled
        // by the request handler
        console.log(' im running before the handler',context); 


        return handler.handle().pipe(
            map((data:any)=>{
                // run something before the response is sent out
                console.log(' im running before the response is sent out',data)
                return plainToClass(this.dto, data,{
                    excludeExtraneousValues:true,
                })
            })
        )

    }

}