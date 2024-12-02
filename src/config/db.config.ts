import { registerAs } from '@nestjs/config';

export const configDB = registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT_PC, 10),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  nameDB: process.env.POSTGRES_DB,
}));
