export interface IMedia {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string | undefined;
    popularity: number;
    poster_path: string | undefined;
    release_date: string | undefined;
    title: string | undefined;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMediaDetails extends IMedia {
    belongs_to_collection: null;
    budget: number;
    genres: IGenre[];
    homepage: string;
    imdb_id: string;
    production_companies: IProductionCompanies[];
    production_countries: IProductionCountries[];
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string | undefined;
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IMediaCredits {
    id: number;
    cast: ICast[];
    crew: ICrew[] | undefined;
}

export interface ICast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface ICrew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface IMediaProviders {
    id: number;
    results: {
        [key: string]: {
            link: string;
            flatrate?: IFlatrate[];
            rent?: IFlatrate[];
            buy?: IFlatrate[];
        }
    };
}

export interface IFlatrate {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}