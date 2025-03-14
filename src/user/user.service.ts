import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './database/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserEntity } from './entities/user-entity.entity';
import { I18nService } from 'nestjs-i18n';
import { GetProfileResponse } from './response/get-profile.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly i18nService: I18nService,
  ) {}

  async getProfile(@CurrentUser() user): Promise<UserEntity> {
    let currentUser =  await this.userRepository.findOne({ 
      where: { id:user.id },
      relations: { role: true },
    });

    if(!currentUser){
      throw new UnauthorizedException(this.i18nService.translate('user.USER_NOT_FOUND'));
    }

    return GetProfileResponse.decode(currentUser);
  }

  async getUsers(): Promise<UserEntity[]> {
    let users = await this.userRepository.find({
      relations: ["role"],
    });

    if(!users){
      throw new UnauthorizedException(this.i18nService.translate('user.USER_NOT_FOUND'));
    }

    return users.map(user => GetProfileResponse.decode(user));
  }

  async findOneByEmail(email): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
