import { ethers } from 'ethers'
/*Futura importação de ABI do contract
import CollectionContractABI from '../path/to/CollectionContract.json';
*/

export const createCollectionOnBlockchain = async (name, description) => {
    if (!window.ethereum) return alert('Please install MetaMask to use this feature.');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractAddress = '0x123456789...';
    const collectionContract = new ethers.Contract(contractAddress, CollectionContractABI, signer);

    try {
        const tx = await collectionContract.createCollection(name, description);
        await tx.wait();
        console.log('Collection created successfully:', tx);
    } catch (error) {
        console.error('Error creating collection:', error);
    }
}