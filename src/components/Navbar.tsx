"use client"

import Image from 'next/image'
import Logo from '../../public/logo.svg'

export default function Navbar() {
    return (
        <nav className="border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                    <Image
                        src={Logo}
                        width={50}
                        alt="Alkitab API Logo" />
                </a>
            </div>
        </nav>
    )
}