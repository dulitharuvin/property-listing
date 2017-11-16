export interface Roles {
    admin?: boolean;
    user: boolean;
}

export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    telephone: string;
    nic: string;
    address: string;
    roles: Roles;

    constructor() {
        this.roles = { user: true }
    }
}
