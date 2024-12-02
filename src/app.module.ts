import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { configDB } from './config/db.config';
import { config } from './config/config';
import { EstatesModule } from './estates/estates.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que las variables de entorno sean accesibles globalmente
      envFilePath: [config[process.env.NODE_ENV] || '.env'], // Conocer el entorno actual
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(configDB)],
      inject: [configDB.KEY],
      useFactory: (configService: ConfigType<typeof configDB>) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.nameDB,
        entities: [Auth], // Aquí puedes agregar las entidades que vas a usar
        synchronize: true, // ¡Solo en desarrollo! No usar en producción.
      }),
    }),
    EstatesModule,
    AuthModule,
  ],
})
export class AppModule {}
