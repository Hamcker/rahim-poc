import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USERNAME || 'sa',
      password: process.env.DB_PASSWORD || 'YourPassword123',
      database: process.env.DB_DATABASE || 'TodoDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
