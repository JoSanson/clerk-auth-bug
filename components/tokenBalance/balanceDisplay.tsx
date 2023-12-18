import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type BalanceDisplayProps = {
    balance: number | string | React.ReactNode;
    titre: string;
    description: string;
};


const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance, titre, description }) => {
  return (
    <div className="flex">
        <Card>
            <CardHeader>
                <CardTitle>{titre}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center'>
                {balance}
            </CardContent>
        </Card>
    </div>
  );
};

export default BalanceDisplay;
