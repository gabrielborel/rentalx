import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  test("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari Test",
      description: "A nice Ferrari",
      brand: "Ferrari",
      category_id: "0f9d4a7f-9224-4c90-8fbe-b2a1414c4d90",
      daily_rate: 500,
      fine_amount: 200,
      license_plate: "ABCD-Test",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  test("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari Test 2",
      description: "A nice Ferrari",
      brand: "Ferrari",
      category_id: "0f9d4a7f-9224-4c90-8fbe-b2a1414c4d90",
      daily_rate: 500,
      fine_amount: 200,
      license_plate: "ABCD-Test-2",
    });

    const cars = await listCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  test("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari Test 3",
      description: "A nice Ferrari",
      brand: "Ferrari",
      category_id: "0f9d4a7f-9224-4c90-8fbe-b2a1414c4d90",
      daily_rate: 500,
      fine_amount: 200,
      license_plate: "ABCD-Test-3",
    });

    const cars = await listCarsUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });

  test("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari Test 4",
      description: "A nice Ferrari",
      brand: "Ferrari",
      category_id: "0f9d4a7f-9224-4c90-8fbe-b2a1414c4d90",
      daily_rate: 500,
      fine_amount: 200,
      license_plate: "ABCD-Test-4",
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
