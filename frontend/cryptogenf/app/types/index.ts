export interface NftProps {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    tags: string[];
    category: string;
    owner: OwnerI;
    collection: CollectionI; 
    floorPrice: number;
    volume: number;
    lastSale: number;
    totalSales: number;
    trends: TrendI;
    createdAt: string; 
    updatedAt: string; 
    forSale?: boolean; 
}

export interface OwnerI {
    id: string;
    name: string;
    profilePic?: string; 
}

export interface TrendI {
    prices: number[];
    dates: string[]; 
}

export interface userDataI {
    id: string;
    name: string;
    email: string;
    profile_image: string;
}

export interface userApiDataI {
    Id: string;
    Name: string;
    Email: string;
    ProfileImage: string;
}

export interface OwnerI {
    id:   string,
    name: string,
}

export interface CollectionI {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    tags: string[],
    owner: OwnerI,
    nfts?: NftProps[];
}
