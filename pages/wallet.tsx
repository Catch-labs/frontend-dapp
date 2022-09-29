import type { Contract } from 'near-api-js';

export interface Web3Props extends Contract {
  nft_event_register: (params: any, gas: any, deposit: any) => any;
  nft_token_by_id: (params: any) => any;
  get_event_by_id: (params: any) => any;
}

function wallet() {
  return <div>wallet</div>;
}

export default wallet;
