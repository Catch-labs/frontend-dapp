import type { WalletConnection } from 'near-api-js';
import { CONTRACT_NAME } from '../config/near';
import { Button } from './ui';

type ProfileProps = {
  walletConnection: WalletConnection | null;
  user: {
    accountId: string;
  };
};

export default function Profile(props: ProfileProps) {
  const { walletConnection, user } = props;
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          walletConnection?.requestSignIn({ contractId: CONTRACT_NAME });
        }}
      >
        Login
      </Button>
      <p>Current user: {user?.accountId ? user.accountId : null}</p>
    </>
  );
}
