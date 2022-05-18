import { Test, TestingModule } from '@nestjs/testing';
import { NeodeModule } from 'neode-nestjs/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtModule } from '@nestjs/jwt';
import * as Neode from 'neode';
import UserSchema from './dto/user.model';
import { UserInterface } from './interfaces/user.interfaces';
import { BadRequestException, ConflictException } from '@nestjs/common';

const mockGoodUser:SignupCredentialsDto = {
  firstname: 'testFirstName',
  lastname: 'testLastName',
  username: 'UserName',
  password: 'A.abc@12345',
  email: 'test@gmail.com'
}

const deleteGoodUser = async () => {
  const instance = Neode.fromEnv().with({User:UserSchema});
  const goodUser:Neode.Node<UserInterface> = await instance.first('User','username','UserName')
  
  if(goodUser){
    instance.delete(goodUser)
  }
}

describe('AuthController', () => {
  let controller: AuthController;


  const loginCredentialsDTO:LoginCredentialsDTO = {
    email:'akramfares2001@gmail.com',
    password: '123456789',
  };
  const loginCredentialsDTOWithWrongPassword:LoginCredentialsDTO = {
    email:'akramfares2001@gmail.com',
    password: 'dsqdsqdq',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        NeodeModule.forFeature({User:UserSchema}),
        JwtModule.register({
          secret: ""+process.env.JWT_SECRET,
          signOptions:{
              expiresIn: 3600 * 24 * 7 // 7 days 
          }
      }),],
      controllers: [AuthController],
      providers:[
        AuthService
      ]
    }).compile();

      controller = module.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('Calls the AuthController.signup and returns the token',async () => {
      await deleteGoodUser()
      await expect(controller.signup(mockGoodUser)).resolves.not.toThrow();
      
      await deleteGoodUser()
      await expect(controller.signup(mockGoodUser)).resolves.toEqual({
        accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      })
    })

    it('Calls the AuthController.signup and reject the repeated user', async () => {
      await expect(controller.signup(mockGoodUser)).rejects.toThrow(ConflictException)
    })
  })
  
  describe('login', () => {
    it('ControllerLogin', async () => {
      // check if the function has recieved the correct login credentials
      await expect(controller.login(loginCredentialsDTO)).resolves.not.toThrow();

      // check if the output the method is an accessToken
      // that match the given pattern ( someting1.something2.something3 )
      await expect(controller.login(loginCredentialsDTO)).resolves.toEqual({
        accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      })

      // check if the function has recieved some wrong login credentials
      await expect(controller.login(loginCredentialsDTOWithWrongPassword)).rejects.toThrow();
    });
  })
});
