import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  test("Should be able to create a new car", async () => {
    const carData = {
      name: "Test-car",
      brand: "Test-brand",
      description: "Test-description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      category_id: "category",
    };

    const car = await createCarUseCase.execute(carData);

    expect(car).toHaveProperty("id");
  });

  test("Should not be able to create a new car with a license plate that already exists", () => {
    expect(async () => {
      const carData = {
        name: "Test-car",
        brand: "Test-brand",
        description: "Test-description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        category_id: "category",
      };

      await createCarUseCase.execute(carData);
      await createCarUseCase.execute(carData);
    }).rejects.toBeInstanceOf(AppError);
  });

  test("Should be able to create a new car with available default value as true", async () => {
    const car = await createCarUseCase.execute({
      name: "Test-car",
      brand: "Test-brand",
      description: "Test-description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
