import { Body, Post, Get, Session, Controller, Param, Query, NotFoundException, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, createParamDecorator } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dtos/update-user.dto';
import {SerializeInterceptor} from  '../Interceptor/serialize.interceptor';
import {Serialize} from '../Interceptor/serialize.interceptor';
import {UserDto} from '../users/dtos/user.dto';
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorator/user.decorator";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService:UsersService , private authService:AuthService){}

    // @Get('/colors/:color')
    // setColor(@Param('color') color:string, @Session() session: any){
    //     session.color = color;
    // }
    // @Get('/colors')
    // getColor(@Session() session:any){
    //     return session.color;
    // }


    @Post('/signup')
    async createuUesr(@Body() body:CreateUserDto  , @Session() session:any){ 
          this.userService.create(body.email , body.password)
          console.log(body);
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id;
        return user
    }

   @Post('/signin')
   async signin(@Body() body:CreateUserDto, @Session() session:any){
       const user = await this.authService.signin(body.email , body.password);
       console.log("usersigin" ,user)
        // session.userId = user.id;
       return user
   }
//    @Get('/whoami')
//          whoAmI(@CurrentUser() user:string, @Session() session:string){
//          return this.userService.findOne(session.userId);
//             //  return user;
//         }
     


    @Post('/signout')
        signOut(@Session() session:any){
            session.userId = null; 
        }
    

    // @Get('/all')
    // findAll(){
    //     return this.userService.findAll();
    // }
    
    
    @Get()
        findAlluser(@Query('email') email:string){
            return this.userService.find(email);
        }

    @Delete('/:id')
        removeUser(@Param('id')  id:string){
                     return this.userService.remove(parseInt(id));
        }
 
    @Patch('/:id')
        updateUser(@Param('id') id:string ,  @Body() body:UpdateUserDto){
            return this.userService.update(parseInt(id),body)

        }

@Serialize(UserDto)
        // @UseInterceptors( new SerializeInterceptor(UserDto))
    @Get('/:id') 
       async findUser(@Param('id') id:string){
           console.log("handler is running")
        //    console.log("handler is running")
            const user = await this.userService.findOne(parseInt(id));
            if(!user){
                throw new NotFoundException('user not found');
            }

            return user; 

        }    
}
