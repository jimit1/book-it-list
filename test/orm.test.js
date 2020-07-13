const {
  seeAllTodos,
  showTodo,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../config/orm");

connection = require("../config/connection-test");

describe("Success", () => {
  describe("seeAllTodos", () => {
    it("should return an object from the todo database", () => {
      return expect(typeof seeAllTodos()).toBe("object");
    });
  });

  describe("showTodo", () => {
    it("should return a single todo object when given the id", () => {
      return expect(typeof showTodo(2)).toBe("object");
    });
  });

  describe("addTodo", () => {
    it("Should resolve with 'Success' when text is submitted", () => {
      return expect(addTodo("Some text")).resolves.toBe("Success");
    });
  });

  describe("deleteTodo", () => {
    it("Should resolve with 'deleted!' when given an id", () => {
      return expect(deleteTodo(1)).resolves.toBe("Deleted!");
    });
  });

  describe("editTodo", () => {
    it("Should resolve with 'Success' when text, status, and id are submitted", () => {
      const obj = {
        text: "Updated Text",
        status: "false",
        id: 2,
      };
      return expect(editTodo(obj)).resolves.toBe("Success");
    });
  });
});
