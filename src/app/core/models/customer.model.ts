interface Account {
    accountNumber: string;
    type: string;
    balance: number;
}
export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    address: string;
    image: string;
    phoneNumber: string;
    accounts:Account[]
}