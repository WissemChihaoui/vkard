import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from '../../routes/hooks';

import { CONFIG } from '../../config-global';

// import { SplashScreen } from '../../components/loading-screen';

import { useAuthContext } from '../hooks';
import { paths } from '../../routes/paths';

// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, authenticated, user } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const returnTo = searchParams.get('returnTo') || paths.profile.root;

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

   

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
