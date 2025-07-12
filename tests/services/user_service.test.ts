import * as UserService from "../../src/services/user_service";
import UserRepository from "../../src/repositories/user_repository";

jest.mock("../../src/repositories/user_repository");

describe("user service signup test", () => {
  test("should successfully create user", async () => {
    const data = {
      name: "karthikeya",
      email: "k@gmail.com",
      password: "1234",
    };

    (UserRepository.prototype.create as jest.Mock).mockReturnValue({
      ...data,
      createdAt: "2025-07-12",
      updatedAt: "2025-07-27",
    });

    const response = await UserService.createUser(data);

    expect(response.email).toBe(data.email);
    expect(response.name).toBe(data.name);
    expect(UserRepository.prototype.create).toHaveBeenCalledWith(data); // optional, but good
  });
});
