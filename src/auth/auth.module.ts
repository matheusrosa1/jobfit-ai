import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule, // Para validar usuários durante a autenticação
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Defina no .env
      signOptions: { expiresIn: '1h' }, // O token expira em 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Disponibilizamos o AuthService para outros módulos
})
export class AuthModule {}
