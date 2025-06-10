import { NftProps } from "../types";

export const defaultPfpImages = ["/assets/profileImages/blueEtPfP.jpeg",
    "/assets/profileImages/happyFoxPfP.jpeg", "/assets/profileImages/RabbitPfP.jpeg", "/assets/profileImages/birdPfP.jpeg", "/assets/profileImages/squirrelPfP.jpeg", "/assets/profileImages/littleRatPfP.jpeg", "/assets/profileImages/funnyRatPfP.jpeg", "/assets/profileImages/madBigDogPfP.jpeg", "/assets/profileImages/darkCatPfP.jpeg", "/assets/profileImages/madDogPfP.jpeg", "/assets/profileImages/madDarkDogPfP.jpeg", "/assets/profileImages/purpleEtPfP.jpeg", "/assets/profileImages/pinkEtPfP.jpeg", "/assets/profileImages/baggyCatPfP.jpeg"];



export const blockchainsOptions = [
    {
        id: 1,
        name: "Ethereum",
        image: '',
        deployCost: 8.99,
        description: "Most popular blockchain"
    }
]

export const getNFTById = async (id: string): Promise<NftProps> =>  {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/nft/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}