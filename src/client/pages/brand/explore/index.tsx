import React from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import("src/components/header").then((mod) => mod.Header), {
    ssr: false,
})

const Navbar = dynamic(() => import("src/components/navbar").then((mod) => mod.Navbar), {
    ssr: false,
})

const Brands = dynamic(() => import("src/components/brands").then((mod) => mod.Brands), {
    ssr: false,
})

const ExploreBrands = () => {
    return (
        <div>
            <Header />
            <Brands />
            <Navbar />
        </div>
    )
}

export default ExploreBrands