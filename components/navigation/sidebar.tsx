"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CircleDollarSign, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import BalanceDisplayNav from "../tokenBalance/balanceDisplayNav";
import useUserData from "@/hooks/getUserData";
import { useUser } from "@clerk/nextjs";


interface SidebarProps {
    onClose?: () => void;
}

const Sidebar = ({
    onClose,
}: SidebarProps) => {
    const { data, loading: userDataLoading, error } = useUserData();
    const pathname = usePathname();
    const { isSignedIn } = useUser(); 
    
    return (
        <div className="bg-white">
            <div className="py-4 px-6 items-center border-b border-gray-200 md:flex hidden">
                <Link href="/">
                    <div className="flex items-center cursor-pointer" role="button" tabIndex={0}>
                        <h1 className="font-bold text-black text-xl">
                        UseMarket
                        </h1>
                    </div>
                </Link>
                <div className="ml-4">
                </div>
                <nav className="flex-1 items-center justify-end space-x-3 flex">
                {!isSignedIn && ( 
                    <>
                <Link href={"/sign-up"}>
                    <div>
                        <Button className="text-sm rounded-lg">
                            Get started
                        </Button>
                    </div>
                </Link>
                </>
                )}
                {isSignedIn && ( 
                <>
                <BalanceDisplayNav />
                <UserButton afterSignOutUrl="/" />
                </>
                )}
            </nav>
            </div>
        </div>
    );
};

export default Sidebar;