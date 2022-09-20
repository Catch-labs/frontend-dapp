import type { Contract, WalletConnection } from 'near-api-js';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import { Toaster } from 'react-hot-toast';

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
import Menu from '../components/ui/Menu';
import { initContract } from '../lib/near-api';
Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS_API_KEY as string);

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
    <div className="relative flex-1 justify-center">
      <Profile walletConnection={walletConnection} user={nearUser} />
      <Component {...pageProps} web3={contract} user={nearUser} />
      <Menu />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default MyApp;
