import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: DayJsDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) throw new AppError("Invalid token!");

    const tokenAlreadyExpired = this.dateProvider.beforeComparison(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );

    if (tokenAlreadyExpired) throw new AppError("Token expired!");

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
