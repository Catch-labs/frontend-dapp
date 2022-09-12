import { WalletConnection } from 'near-api-js';
import { CONTRACT_NAME } from '../config/near';

type ProfileProps = {
  walletConnection: WalletConnection;
};

export default function Profile(props: ProfileProps) {
  const { walletConnection } = props;
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        walletConnection.requestSignIn({ contractId: CONTRACT_NAME });
      }}
    >
      Login
    </button>
  );
}
