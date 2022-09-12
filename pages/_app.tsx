import type { Contract, WalletConnection } from 'near-api-js';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import 'swiper/css/bundle';
// tailwind
import '../styles/index.css';
import '../styles/swiper.css';

// fonts
import '@fontsource/anton/latin.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';

import Profile from '../components/Profile';
import { initContract } from '../lib/near-api';
import store from '../lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  const [contract, setContract] = useState<Contract | null>(null);
  const [nearUser, setNearUser] = useState<any | null>(null);
  const [nearConfig, setNearConfig] = useState<any | null>(null);
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);

  useEffect(() => {
    initContract().then(({ contract, currentUser, nearConfig, walletConnection }) => {
      setContract(contract);
      setNearUser(currentUser);
      setNearConfig(nearConfig);
      setWalletConnection(walletConnection);
    });
  }, []);

  return (
    <Provider store={store} contract={contract}>
      <div className="relative">
        <Profile walletConnection={walletConnection} />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
