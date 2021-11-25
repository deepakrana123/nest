import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private repo: Repository<User>){
        this.repo = repo;

    }


    create(email:string , password:string){
        const user = this.repo.create({email,password});// instance to create 
        return this.repo.save(user);//then save it

    }

    find(email:string){
        return this.repo.find({email})
          
    }

    findOne(id:number){
        return this.repo.findOne(id)

    }

    async update(id:number , attrs:Partial<User>){
        const user =  await this.repo.findOne(id);
        if(!user){
            throw new Error('user not found');

        }

        Object.assign(user , attrs);
        return this.repo.save(user);


    }

   async remove(id:number){
             const user = await this.repo.findOne(id);
             if(!user){
                 throw new Error('user not found');
             }

             return this.repo.remove(user)
    }
     
    
}
