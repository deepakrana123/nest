import {Test} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';
import {User} from './user.entity';
//to use FakeUserService as the  userService either we can provide it in the useValuee , 
// in thr provider or in the way to write as <partial> User Service then it compare only those service which used in the authservice with its vaue to in compare to fake user 
// to connect it with the
//  describe just organised the file in good way
describe('AuthService' ,()=>{
let service:AuthService;
let fakeUserService :Partial<UsersService>;
beforeEach(async ()=>{
     // create a fake copy of the user service
    //Partial<UserService> is just the all the service or method which are taken form the usersevice are partial match correctly
    fakeUserService={
    
        find:() =>Promise.resolve([]),
        create:(email:string , password:string)=> Promise.resolve({id:1 , email,password} as User)
    }
    const module = await Test.createTestingModule({
        providers :[AuthService,
        {
            provide:UsersService,
            useValue:fakeUserService
        }]
    }).compile();
    service =module.get<AuthService> (AuthService);

})
it(' can create an instance of auth service ' ,async ()=>{
   
    // const service = module.get(AuthService);

    expect(service).toBeDefined();
});    

it(' creates a new user with a salted and hashed password' , async ()=>{
    const user = await service.signup('asdf@gmail.com' ,'asdf')
    expect(user.password ).not.toEqual('asdf');
    const [salt, hash]=user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
});
it('throws a error if user signs up with email that is in use' , async (done)=>{
    fakeUserService.find=()=>Promise.resolve([{id:1,email:'a@gmail.com',password:'1'} as User])
    try{
    await service.signup('asdf@gmail.com' ,'asdf' )
    }
    catch(err){
        done(err)
        return
    }
})

// it(' throws an errror if the user mail is unused' ,async (done) => {
//        try{
//                  await service.signin('asdfg@gmail.com' ,'asdfgh')
//        }
//        catch(err){
//            done();
//            return

//        }
// })
});

