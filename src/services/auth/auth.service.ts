import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IConfigDto } from '../../dto/env.dto';
import { LoginRequestDto, LoginResponseDto } from '../../dto/auth/login.dto';
import { badRequestHandler } from '../../utils/error-handler.util';

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _jwtService: JwtService,
    private _configService: ConfigService<IConfigDto>,
  ) {}

  private _generateJwtToken = async (
    user_data: UserDocument,
    expires: number | string,
  ) =>
    await this._jwtService.signAsync(
      {
        sub: user_data._id,
        role: user_data.role,
      },
      {
        secret: this._configService.get('JWT_SECRET'),
        expiresIn: expires,
      },
    );

  public login = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
    const user_data: UserDocument =
      await this._userRepository.getUserByUsername(data.username);
    if (user_data === null) {
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!(await bcrypt.compare(data.password, user_data.password))) {
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      access_token: await this._generateJwtToken(
        user_data,
        this._configService.get('JWT_ACCESS_TOKEN_EXPIRES'),
      ),
      refresh_token: await this._generateJwtToken(
        user_data,
        this._configService.get('JWT_REFRESH_TOKEN_EXPIRES'),
      ),
    };
  };

  public register = async (user_data: User): Promise<void> => {
    if (
      await this._userRepository.checkUsernameExists(
        user_data.username,
        user_data.role,
      )
    ) {
      badRequestHandler(['username cannot be used']);
    }
    user_data.password = await bcrypt.hash(
      user_data.password,
      await bcrypt.genSalt(),
    );

    await this._userRepository.addUser(user_data);
  };

  public refresh = async (refresh_token: string): Promise<LoginResponseDto> => {
    const payload = this._jwtService.verify(refresh_token, {
      secret: this._configService.get('JWT_SECRET'),
    });
    return {
      access_token: await this._generateJwtToken(
        payload,
        this._configService.get('JWT_ACCESS_TOKEN_EXPIRES'),
      ),
      refresh_token: refresh_token,
    };
  };
}
