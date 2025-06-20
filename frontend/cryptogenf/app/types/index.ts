export interface NftProps {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    tags: string[];
    category: string;
    owner: OwnerI;
    collection?: CollectionI; 
    floorPrice: number;
    volume: number;
    lastSale?: number;
    totalSales: number;
    trends: TrendI;
    drop?: Drop;
    createdAt: string;
    contract?: ContractI;
    updatedAt: string; 
    attributes?: any;
    history?: Transaction[];
}

export interface Drop {
    id: string;
    name: string;
    description: string;
    collection: CollectionI;
    collection_id: string;
    image_url: string;
    tags: string[];
    owner: OwnerI;
    dropDate: Date;
    price: number;
    totalSupply: number;
    blockchain: BlockchainType;
    nfts?: NftProps[];
    createdAt: Date;
}

export interface Transaction {
  id: string;
  type: string;
  timestamp: string;
  price: number;
  fromAddress: string;
  toAddress: string;
}

export interface ContractI {
    address: string;
    network: string;
}

export interface OwnerI {
    id: string;
    name: string;
    profilePic?: string; 
}

export interface TrendI {
    prices: number[];
    dates: string[]; 
    status: string;
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
 

export interface CollectionI {
    id: string,
    name: string,
    symbol: string;
    description: string,
    image_url: string,
    tags: string[],
    owner: OwnerI,
    blockchain: string,
    category: string,
    nfts?: NftProps[];
    created_at: string,
    updated_at: string,
}


export type BlockchainType = {
    id: number;
    name: string;
}