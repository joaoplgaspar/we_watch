export interface IFavorite {
    mediaId: number;
}

export interface IMedia {
    mediaId: number;
}

export interface IUserList {
    dataCriacao: string;
    midias: IMedia[];
    name: string;
    privacidade: string;
}

export interface IRate {
    desc: string;
    mediaId: number;
    rate: number;
}

export interface IUserData {
    avatar: string;
    email: string;
    avaliacoes: IRate[]
    favoritos: IFavorite[];
    minhasListas: IUserList[];
    name: string;
}
  