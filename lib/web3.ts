import { BN } from "bn.js";
import { Contract } from "near-api-js";
import { initContract } from "./near-api";

let web3: Contract | null = null;
let user: any | null = null;
initContract().then(({ contract, currentUser }) => {
    web3 = contract;
    user = currentUser;
})

export const getNFT = async (tokenId: string) => {
    if (web3) {
        const response = await web3.nft_token_by_id({
            token_id: tokenId,
        });

        return response;
    }
};

export const collectEventNft = async (tokenId: string) => {
    if (web3) {
        await web3.nft_event_register(
            {
                token_id: tokenId,
                receiver_id: user.accountId,
            },
            300000000000000, // gas
            new BN('1000000000000000000000000')
        );
    }
};