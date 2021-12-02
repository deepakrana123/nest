import { Expose } from "class-transformer";


//  properties share with the outside world
export class UserDto{
    @Expose()
    id:number;

    // @Expose()
    // email:string;
    @Expose()
    password:string;
}