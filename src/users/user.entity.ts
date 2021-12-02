import {AfterInsert , AfterRemove,AfterUpdate,Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
// import {Exclude} from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    // @Exclude() nopt required in interceptor property
    password:string;
// this are the hooks
    @AfterInsert()
    logInsert(){
        console.log('intserted user wih id' , this.id);
    }

    @AfterUpdate()
    logUpdate(){
         console.log('intserted user update wih id' , this.id);
    }

    @AfterRemove()
    remove(){
        console.log('intserted user remove wih id' , this.id);
    }

}