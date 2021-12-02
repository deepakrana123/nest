import {Injectable,BadRequestException,NotFoundException} from '@nestjs/common';
import {UsersService} from './users.service';
import {randomBytes , scrypt as _Scrypt} from 'crypto';
import {promisify} from 'util';

// typescript doesnot understand this
const scrypt = promisify(_Scrypt);

@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}

   async signup(email:string , password:string){
// see if email is in use
        const user = await  this.usersService.find(email);
        if(user.length){
            throw new BadRequestException('email in use')
        }
    
        // hash the users password
          // generate a salt

          const salt = randomBytes(8).toString('hex');
          // hash the salt and password together

          const hash=(await scrypt(password , salt , 32)) as Buffer;

          // create a new user and save it
          const result = salt + '.' + hash.toString('hex');
          // join the hashed result and the salt together

          
        const users = await this.usersService.create(email,result);
        console.log(users ,"user")

        return users;
    //   console.log(users)
        
    }
// adead97a7bf35db8.6eefd70d1996777b61636bfd7faa838dc0eba36ff2749ffdb1c5d346586bd7dc
    async signin(email:string , password:string){
        const [user] = await this.usersService.find(email);
        console.log(user.password ,"user.password")
        if(!user){
            throw new NotFoundException("user not found or invaild email or password");
        }

        const [salt , storehash] = user.password.split('.');
        console.log("salt", salt);
        console.log("storehash" ,storehash)

        const hash = (await scrypt(password , salt , 32)) as Buffer
        console.log(hash.toString('hex') ,"hash")

         if(storehash === hash.toString('hex')){
               return user;
         }
         else{
            
             throw new BadRequestException('bad password or you are typing a wrong password');
         }
    }

}