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

export interface OwnerI {
    id:   number,
    name: string,
}

export interface CollectionI {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    tags: string[],
    owner: OwnerI,
    nfts: nftProps[],
}

export interface NftI {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    tags: string[],
    owner: OwnerI,
    price: number,
}