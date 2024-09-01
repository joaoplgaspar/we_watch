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
    error: string;
}

export interface IBanner {
    type: string,
    local: boolean,
    src: string,
    alt: string,
    title: string,
    description: string,
    button: {
        text: string,
        link: string
    }[]
}