"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let TodoService = class TodoService {
    constructor() {
        this.todos = [];
    }
    findAll() {
        return this.todos;
    }
    findById(id) {
        return this.todos.find((todo) => todo.id === id);
    }
    create(title) {
        const todo = {
            id: (0, uuid_1.v4)(),
            title,
            completed: false,
            createdAt: new Date(),
        };
        this.todos.push(todo);
        return todo;
    }
    delete(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => todo.id !== id);
        return initialLength > this.todos.length;
    }
    update(id, completed) {
        const todo = this.findById(id);
        if (todo) {
            todo.completed = completed;
        }
        return todo;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)()
], TodoService);
//# sourceMappingURL=todo.service.js.map