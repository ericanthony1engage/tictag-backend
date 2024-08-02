import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from '../../schema/user.schema';
import { of } from 'rxjs';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user by id', (done) => {
      const user = {
        _id: new Types.ObjectId(),
        name: 'Test User',
        email: 'test@example.com',
      };
      jest.spyOn(userModel, 'findById').mockReturnValue({
        lean: jest.fn().mockReturnValue(of(user)),
      } as any);

      userRepository.getUser(user._id).subscribe((result) => {
        expect(result).toEqual(user);
        expect(userModel.findById).toHaveBeenCalledWith(user._id);
        done();
      });
    });
  });

  describe('addUser', () => {
    it('should add a new user', (done) => {
      const user = {
        name: 'New User',
        email: 'new@example.com',
      } as unknown as User;
      jest.spyOn(userModel, 'create').mockReturnValue(of(user) as any);

      userRepository.addUser(user).subscribe((result) => {
        expect(result).toEqual(user);
        expect(userModel.create).toHaveBeenCalledWith(user);
        done();
      });
    });
  });
});
