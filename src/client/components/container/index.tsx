export { PaymentContainer } from "./storepayment";
export { ReviewContainer } from "./review";
export { SearchContainer } from "./search";
export { OrderItemContainer } from "./orderitem";
export { OrderSummaryContainer } from "./ordersummary";
export { TrendingProductContainer } from "./trendingproduct";
export { ProductCategoryContainer } from "./categorycontainer";

interface Props {
  children: any;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto bg-neutral-50">
      {children}
    </div>
  );
};
