'use client'

import { signOut, useSession } from 'next-auth/react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Image
} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import logo from '@/app/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { Routes, getUserRoutes, routes } from '../utils/routes';

export default function AuthenticatedNavbar() {
    const { data: session, status } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<Routes[]>();

    const router = useRouter()

    async function changeRoute(e: any, route?: string) {
        if (route) {
            router.push(route)
        } else {
            await signOut()
        }

        setIsMenuOpen(false)
    }

    useEffect(() => {
        const menuItems = getUserRoutes(session?.user.tipoUsuario)

        setMenuItems(menuItems)
    }, [session])

    return session?.user && (
        <Navbar
            shouldHideOnScroll
            disableAnimation
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-orange-400 shadow-lg"
        >
            <NavbarContent className="text-white" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="pr-3" justify="center">
                <NavbarBrand>
                    <Image
                        alt="logo"
                        src={logo.src}
                        onClick={(e: any) => changeRoute(e, '/')}
                        width="180"
                    ></Image>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <h1 className="text-white">{session?.user.nome}</h1>
            </NavbarContent>

            <NavbarMenu className="bg-orange-400 md:w-1/5">
                {menuItems?.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} className='md:py-1 w-full text-white hover:cursor-pointer' onClick={(e) => changeRoute(e, item.route)}>
                        <p>{item.name}</p>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
