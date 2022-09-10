import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  test("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123",
      email: "user@test.com",
      password: "123123",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  test("should not be able to authenticate an user that does not exists", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "falsefalse",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should not be able to authenticate an user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123",
        email: "user@test.com",
        password: "123123",
        name: "User test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "hehehehehehe",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
