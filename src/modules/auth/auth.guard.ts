import { Injectable } from '@nestjs/common';
import { AuthGuard as NAuthGuard } from '@nestjs/passport';

class AuthGuard extends NAuthGuard('jwt') {}

@Injectable()
export class CustomerAuthGuard extends AuthGuard {}

@Injectable()
export class UserAuthGuard extends AuthGuard {}
