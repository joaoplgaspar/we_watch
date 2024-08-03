export interface IAccessForm {
    action: (event: React.FormEvent) => Promise<void>;
    login?: boolean;
    register?: boolean;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword?: string;
    setConfirmPassword?: (confirmPassword: string) => void;
}