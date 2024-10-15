export interface nftProps {
    id: string;
    name: string;
    description: string;
    Images: string[];
    price: number;
    owner: string;
    forSale: boolean;
}

export interface userDataI {
    id: string;
    name: string;
    email: string;
    profilePic: string;
}

export interface userApiDataI {
    Id: string;
    Name: string;
    Email: string;
    ProfileImage: string;
}