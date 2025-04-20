export interface ISocial {
    name: string;
    link: string
}
export interface IUser {
    id: number;
    name: string;
    avatar: string;
    tag: string;
    socials: ISocial[],
}
