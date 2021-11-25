import {AfterInsert , AfterRemove,AfterUpdate,Entity,Column,PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log('intserted user wih id' , this.id);
    }

    @AfterUpdate()
    logUpdate(){
         console.log('intserted user wih id' , this.id);
    }

    @AfterRemove()
    remove(){
        console.log('intserted user wih id' , this.id);
    }

}