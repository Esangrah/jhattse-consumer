import { CarouselContainer } from "@components/container/carousel";
import { SwiperSlide } from "swiper/react";
import { TProduct, TProductCategory } from "./../types";
import { SimpleCard } from "./product/simple";

export { CategoryCard } from "./category"
export { FeatureCard } from "./feature";
export { ReviewCard } from "./review";
export { StoreReviewCard } from "./review/store";
export { RichCard } from "./product/rich";
export { MainCard } from "./main";
export { OrderSummaryCard } from "./order/summary";
export { OrderItemCard } from "./orderitem";
export { PaymentCard } from "./payment";
export { SimpleCard } from "./product/simple";
export { SmallProductCard } from "./product/small"
export { SmallCategoryCard } from "./category/xsmall";
export { SmallStoreCard } from "./store/small";
export { StoreTopCard } from "./store";
export { AddressSmallCard } from "./address/addresssmall";
export { StoreCartContainer } from "../container/storecart";
export { OrderInfoCard } from "./order/info"
export { ProductCategoryCard } from "./product/category"
export { BrandCard } from "./brands";
export { ExporeBrandCard } from "./brands/explore";
export { ProductCardWithProvider } from "./productcardwithprovider";


interface Props {
    products: (TProduct | TProductCategory)[],
    intent?: string,
    element?: React.ElementType;
    isCarousel?: boolean;

}

const INTENT: Map<string, number> = new Map([["product", 0], ["category", 1]]);
export const Cards = ({ element, products, intent, isCarousel }: Props) => {
    let RepeatElement = element == undefined || element == null ? SimpleCard : element;
    let cards;
    switch (INTENT.has(intent) ? INTENT.get(intent) : 0) {
        case 1:
            cards = products && (products as TProductCategory[])?.map((category: TProductCategory) => (
                <RepeatElement product={category} key={category.id}></RepeatElement>
            ))
        default:
            cards = products && (products as TProduct[])?.map((product: TProduct) => (
                <RepeatElement product={product} key={product.id}></RepeatElement>
            ))
    }
    return (
        isCarousel ?
                <div>
                    <CarouselContainer >
                        {
                            cards.map((item) => {
                                return <SwiperSlide style={{ width: "auto" }} className="min-w-0">{item}</SwiperSlide>
                            })
                        }
                    </CarouselContainer>
                </div>

            :
            <div className="flex px-4 gap-4 rounded-xl flex-row overflow-x-scroll no-scrollbar">
                {
                    cards
                }
            </div>
    )
}