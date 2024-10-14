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