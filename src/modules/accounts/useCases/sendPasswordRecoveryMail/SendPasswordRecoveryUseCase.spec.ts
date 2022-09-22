import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendPasswordRecoveryMailUseCase } from "./SendPasswordRecoveryMailUseCase";

let sendPasswordRecoveryMailUseCase: SendPasswordRecoveryMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Password Recovery", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    sendPasswordRecoveryMailUseCase = new SendPasswordRecoveryMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  test("should be able to send a recovery password email to the user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "aaa",
      email: "biel_borel@hotmail.com",
      name: "Gabriel Borel",
      password: "bielborel19",
    });

    await sendPasswordRecoveryMailUseCase.execute("biel_borel@hotmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  test("should not be able to send a recovery password email if user does not exists", async () => {
    await expect(
      sendPasswordRecoveryMailUseCase.execute("dont-exists@hotmail.com")
    ).rejects.toBeInstanceOf(AppError);
  });

  test("should be able to create an users token", async () => {
    const generateRefreshToken = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "aaa",
      email: "biel_borel@hotmail.com",
      name: "Gabriel Borel",
      password: "bielborel19",
    });

    await sendPasswordRecoveryMailUseCase.execute("biel_borel@hotmail.com");

    expect(generateRefreshToken).toHaveBeenCalled();
  });
});
