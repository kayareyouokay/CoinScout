"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchModal } from "./search/SearchModal";

export default function Header() {
    const pathname = usePathname();

    return (
        <header>
            <div className="main-container inner">
                <Link href="/">
                    <Image src="/logo.svg" alt="CoinScout logo" width={132} height={40}/>
                </Link>

                <nav>
                <Link href="/" className={cn('nav-link', {
                    'is-active': pathname === '/',
                    'is-home': true
                })} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
                <SearchModal />
                <Link href="/coins" className={cn('nav-link', {
                    'is-active':
                        pathname === "/coins" || pathname.startsWith("/coins/"),
                    
                })} aria-current={pathname.startsWith('/coins') ? 'page' : undefined}>All Coins</Link>
            </nav>
            </div>
        </header>
    )
}
