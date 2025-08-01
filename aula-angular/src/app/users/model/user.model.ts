export interface User{
    id: number;
    name: string;
    email: string;
    senha: string;
    login: string;
    photo?: string;
    phone: number;
    matricula: string;
    isActive: boolean;
    createdDate: Date;
}