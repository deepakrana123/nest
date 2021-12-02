import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "./users/user.entity";
import {Reports} from "./reports/reports.entity";
// import {ValidationPipe} from '@nestjs/common';

// synchronize stands for to change the structure of the table
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'dbs.sqlite',
    entities:[User,Reports],
    synchronize:true,
  }), 
  UsersModule, 
  ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  