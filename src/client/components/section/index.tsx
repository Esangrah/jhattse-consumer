import { Cards } from "@components/cards";
import { TBrand, TProduct, TProductCategory } from "@components/types";
import { Link} from "react-router-dom"

type Props = {
    title?: string,
    intent?: string,
    products: (TProduct | TProductCategory)[]
    style?: string,
    headStyle?: string,
    viewUrl?: string,
    element?: React.ElementType;
    isCarousel?: boolean;
};

export const Section: React.FC<Props> = ({ element, intent, title, products, style, headStyle, viewUrl, isCarousel }) => {
    let finalStyle = style == undefined || style == "" ? "pb-4 bg-ternary" : style;
    return (
        products?.length > 0 &&
        // <div className={`section select-none ${finalStyle}`}>
        <div className={ `section select-none ${finalStyle}`}>
            {title && <div className="flex flex-row justify-between py-3">
                <div className={headStyle === null || headStyle === undefined ? "text-xl py-1 px-4 font-semibold" : headStyle}>{title}</div>
                {viewUrl && <div className="flex items-center text-sky-500 text-xs py-1 px-4 font-semibold"><Link to={viewUrl}>VIEW ALL</Link>
                </div>}
            </div>}
            <Cards isCarousel={isCarousel} products={products} element={element} intent={intent} />
        </div>
    )
}