import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { configDB } from './config/db.config';
import { config } from './config/config';

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
        entities: [], // Aquí puedes agregar las entidades que vas a usar
        synchronize: true, // ¡Solo en desarrollo! No usar en producción.
      }),
    }),
  ],
})
export class AppModule {}
