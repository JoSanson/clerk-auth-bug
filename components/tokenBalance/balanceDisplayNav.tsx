import React, { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';
import { useInterval } from '@/lib/useInterval';
import { globalEmitter } from '@/lib/eventEmmiter';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const BalanceDisplayNav: React.FC = () => {
  const { user } = useUser();
  const [balance, setBalance] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [checkStartTime, setCheckStartTime] = useState<number | null>(null);


  const fetchBalance = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    // Si plus de 5 minutes se sont écoulées, arrêtez de chercher
    if (checkStartTime && Date.now() - checkStartTime >= 5 * 60 * 1000) {
      setIsFetching(false);
      setCheckStartTime(null);  // Réinitialiser le temps de début
      return;
    }
    
    try {
      const response = await fetch("/api/getUserBalance");
      if (response.ok) {
        const data = await response.json();
        console.log("LOG USER BALANCE:", data);
        
        // Si la balance a changé, arrêtez de chercher et réinitialisez le temps de début
        if (balance !== data.tokenBalance) {
          setIsFetching(false);
          setCheckStartTime(null);  // Réinitialiser le temps de début
        }
        
        setBalance(data.tokenBalance);
      }
    } catch (error) {
      console.error("Failed to fetch user balance:", error);
    }
  };

  useInterval(fetchBalance, isFetching ? 5000 : null);

  useEffect(() => {
    fetchBalance(); // Fetch once on component mount

    const startFetching = () => {
      setIsFetching(true);
      setCheckStartTime(Date.now());  // Définir le temps de début lorsque la vérification commence
    };

    globalEmitter.on('startCheckingBalance', startFetching);

    // Cleanup: stop fetching and remove the listener when the component unmounts
    return () => {
      setIsFetching(false);
      setCheckStartTime(null);  // Réinitialiser le temps de début
    };
  }, []);

  console.log("MA USER BALANCE", balance)

  return (
    <>
    <div>
      <p className='md:hidden mb-2'>My token balance</p>
      <div className='flex'>
          <div className="flex items-center bg-violet-100 py-2 px-3 rounded-l-lg max-w-[120px] ">
            <Coins className='h-4 w-4 mr-2' /> {balance}
          </div>
          <Link href="/pricing">
            <Button className='w-full rounded-l-none rounded-r-lg'>
              Buy tokens <Coins className='h-4 w-4 ml-1'/>
            </Button>
          </Link>
      </div>
    </div>
    </>
  );
};

export default BalanceDisplayNav;
