
import * as DummyService from "../../src/services/dummy_service";

test('should return "Learning Js" if helper returns true', () => {
  jest.spyOn(DummyService, 'helper').mockReturnValue(true); // helper returns true
  const result = DummyService.execute();
  expect(result).toBe("Learning Js"); // ✅ correct expectation
});

test('should return "Learning TS" if helper returns false', () => {
  jest.spyOn(DummyService, 'helper').mockReturnValue(false);
  const result = DummyService.execute();
  expect(result).toBe("Learning TS");
});
