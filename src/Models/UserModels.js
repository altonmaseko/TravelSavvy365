import bcrypt from 'bcrypt';

export default class UserModel {
    constructor(id, name, email, password, employeeType = 'employee', organization = 'company') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password; // should be hashed before saving
        this.employeeType = employeeType;
        this.organization = organization;
        this.createdAt = new Date();
    }

    // Hash the password before saving
    static async hashPassword(plainPassword) {
        const saltRounds = 10;
        return await bcrypt.hash(plainPassword, saltRounds);
    }

    // Verify password
    async verifyPassword(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    }

    // Format for API responses (exclude password)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            employeeType: this.employeeType,
            organization: this.organization,
            createdAt: this.createdAt
        };
    }
}
