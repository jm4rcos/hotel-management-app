export interface User {
    id?: number;
    username: string;
    password: string;
    role: 'admin' | 'employee';
}

export default class UserModel {
    private users: User[] = [];

    public createUser(user: User): User {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }

    public findUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    public getAllUsers(): User[] {
        return this.users;
    }
}