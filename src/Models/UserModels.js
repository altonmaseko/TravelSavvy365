// userModels.js
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

class UserModel {
    #password;

    constructor(
        id = uuidv4(),
        name,
        email,
        password,
        employeeType = "employee",
        isHashed = false
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.employeeType = employeeType;

        if (isHashed) {
            this.#password = password; // Already hashed
        } else {
            this.#password = this.hashPassword(password); // Hash on creation
        }
    }

    hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }

    static fromJson(json) {
        return new UserModel(
            json.id,
            json.name,
            json.email,
            json.password,
            json.employeeType,
            true // Indicate that password is already hashed
        );
    }

    getPassword() {
        return this.#password;
    }

    verifyPassword(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.#password);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            employeeType: this.employeeType
            // Do not include password
        };
    }
}

const user = new UserModel(undefined, "Jane Doe", "jane@example.com", "securePass123", "admin");

console.log("User:", user.toJSON());
console.log("Password is valid:", user.verifyPassword("securePass123")); // true
console.log("Wrong password:", user.verifyPassword("wrongPassword")); // false


export default UserModel;
