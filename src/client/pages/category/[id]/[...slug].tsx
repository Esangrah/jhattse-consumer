import Head from 'react-helmet';
import React, { useEffect, useState } from "react";
import { Container, Header, Section } from "@components";
import { Navbar } from "@components"
import { ProductCardWithProvider, SmallCategoryCard } from "@components/cards";
import { SearchContainer } from "@components/container"
import { TProduct, TProductCategory } from "@components/types";
import { getFeaturedProducts, getProductCategory, getProductCategories } from "@api/product";
import { getSafeUrl } from "@core/utils";
import { useLocation, useParams } from 'react-router-dom';

interface Props {
    initialProductCategory?: TProductCategory
    initialProductSubCategories?: TProductCategory[]
    initialProductList?: TProduct[]
}

// export const getServerSideProps: GetServerSideProps<{ initialProductCategory: TProductCategory, initialProductSubCategories: TProductCategory[], initialProductList: TProduct[] }> = async (context) => {
//     const { slug } = context.params;
//     const res = getProductCategory(parseInt(slug[0] as string));
//     const initialProductCategory: TProductCategory = await res;

//     const resSubCategories = getProductCategories(parseInt(slug[0] as string));
//     const initialProductSubCategories: TProductCategory[] = await resSubCategories;

//     const resProductList = getFeaturedProducts(parseInt(slug[0] as string));
//     const initialProductList: TProduct[] = await resProductList;

//     return {
//         props: {
//             initialProductCategory: initialProductCategory,
//             initialProductSubCategories: initialProductSubCategories,
//             initialProductList: initialProductList
//         },
//     }
// }


const ProductList: React.FC = ({ initialProductCategory, initialProductSubCategories, initialProductList }: Props) => {
    const [productCategory, setProductCategory] = useState<TProductCategory>(initialProductCategory);
    const [subCategories, setSubCategories] = useState<TProductCategory[]>(initialProductSubCategories);
    const [products, setProducts] = useState<TProduct[]>(initialProductList);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const pageSize = 20;
    const location = useLocation()
    const params = useParams();
    const queryParams = new URLSearchParams(location.search)

    const getAllFeaturedProducts = (extend: boolean = true) => {
        let id = params.id;
        if (id != undefined) {
            const resProducts: Promise<TProduct[]> = getFeaturedProducts(parseInt(id), null, null, pageNumber, pageSize);
            resProducts.then((result) => {
                setIsLoadMore(result.length == pageSize)
                if (extend) {
                    setProducts([...products, ...result])
                } else {
                    setProducts(result);
                }
            });
        }
    }

    useEffect(() => {
        let id = params.id;
        if (id == productCategory?.id.toString()) {
            return
        }
        const res: Promise<TProductCategory> = getProductCategory(parseInt(id));
        res.then((productCategory) => { setProductCategory(productCategory); });
        const resSubCategories: Promise<TProductCategory[]> = getProductCategories(parseInt(id));
        resSubCategories.then((categories) => setSubCategories(categories));
    }, [location],)

    useEffect(() => {
        if (pageNumber == 0) {
            getAllFeaturedProducts(pageNumber != 0);
        } else {
            setPageNumber(0);
        }

    }, [location])

    useEffect(() => {
        getAllFeaturedProducts(pageNumber != 0);
    }, [pageNumber])

    return (
        <Container>
            <Head>
                <title>{`${productCategory?.name} products - Jhattse`}</title>
                <meta name="Keywords" content={`${productCategory?.name} Products, Local Services,${productCategory?.name},Jhattse`} />
                <meta name="Description" content={`Get ${productCategory?.name} products from nearby local stores on Jhattse`} />
                <link rel="canonical" href={`https://jhattse.com/category/${productCategory?.id}/${getSafeUrl(productCategory?.name)}`} />
                <meta property="og:title" content={`${productCategory?.name} products on Jhattse`} />
                <meta name="og:description" content={`Get ${productCategory?.name} products from nearby local stores on Jhattse`} />
                <meta name="og:image" content={`${productCategory?.image}`} />
                <meta property="og:url" content={`https://jhattse.com/category/${productCategory?.id}/${getSafeUrl(productCategory?.name)}`} />
            </Head>
            <Header />
            <div className="px-20 sm:px-4">
                <div className="divide-y-2 divide-solid">
                    <div className="py-2 grid grid-flow-col">
                        <div className="flex items-center justify-start">
                            <p className="text-sm text-neutral-400 font-semibold">Showing <span className="text-neutral-900 font-bold text-lg">{productCategory?.name}</span></p>
                        </div>
                        <div className="flex items-center justify-end">
                            <p className="text-sm text-neutral-400 font-semibold text-right">{products?.length} Products</p>
                        </div>
                    </div>
                    <Section products={subCategories} element={SmallCategoryCard} intent="category" style=" bg-neutral-200 text-neutral-900" headStyle="p-2 font-medium text-base" />
                </div>
                <div className="h-2"></div>
                <SearchContainer searchresults={products} element={ProductCardWithProvider} isLoadMore={isLoadMore} pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
            <Navbar />
        </Container>
    );
};

export default ProductList;