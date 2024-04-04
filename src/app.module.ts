import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') || 'localhost',
        port: configService.get('DATABASE_PORT_OUT') || 5432,
        username: configService.get('DATABASE_USER') || 'lincode',
        password: configService.get('DATABASE_PASSWORD') || '13780',
        database: configService.get('DATABASE_DB') || '1',
        entities: [User, Book],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
