import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdded24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  test("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test car",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 50,
      category_id: "123",
      brand: "test brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdded24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  test("should not be able to create a new rental when the user is already on a rent", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "1212",
      expected_return_date: dayAdded24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdded24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  test("should not be able to create a new rental when the car is already on a rent", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: dayAdded24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdded24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  test("should not be able to create a new rental with expected return date less than 24hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
