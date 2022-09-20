import { PUBLIC_URL } from 'config/routing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DashboardIcon, MapIcon, MarketIcon, WalletIcon } from '../icons';

export default function Menu() {
  const router = useRouter();
  return (
    <nav className="navbar fixed bottom-0 inset-x-0 border-t border-lightGrey px-4 py-3 sm:px-6 xs:px-12 flex flex-row justify-between">
      <Link href={'/'}>
        <DashboardIcon
          className={(router.pathname == PUBLIC_URL.overview ? 'text-primary ' : 'text-darkGrey') + ' m-4'}
        />
      </Link>
      <Link href={'/map'}>
        <MapIcon className={(router.pathname == PUBLIC_URL.map ? 'text-primary ' : 'text-darkGrey') + ' m-4'} />
      </Link>
      <Link href={'/market'}>
        <MarketIcon className={(router.pathname == PUBLIC_URL.market ? 'text-primary ' : 'text-darkGrey') + ' m-4'} />
      </Link>
      <Link href={'/wallet'}>
        <WalletIcon className={(router.pathname == PUBLIC_URL.wallet ? 'text-primary ' : 'text-darkGrey') + ' m-4'} />
      </Link>
    </nav>
  );
}
