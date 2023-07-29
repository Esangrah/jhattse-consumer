import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react"
import { SmallProductCard } from "@components/cards"
import { SearchContainer } from "@components/container"
import { TProductCategoryControl } from "@components/types"



interface Props {
    index: number,
    isLoading: boolean,
    getNextResults: Function,
    handleAccordionButton: Function,
    handleAccordionItem: Function,
    productCategoryItem: TProductCategoryControl

}

export const CategoryWidget = ({ index, isLoading, getNextResults, handleAccordionButton, handleAccordionItem, productCategoryItem }: Props) => {
    

    return (
        <AccordionItem  className="bg-neutral-50 text-custom_gray border border-neutral-400 rounded cursor-pointer font-bold mb-2 p-2 text-lg" onClick={() => handleAccordionItem()} >
            <h2 id={productCategoryItem.name}>
                <AccordionButton
                 onClick={() => handleAccordionButton(productCategoryItem, index)}>
                    <Box as="span" flex='1' textAlign='left'>
                        {productCategoryItem.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <SearchContainer
                    pageNumber={productCategoryItem?.pageNumber}
                    setPageNumber={getNextResults}
                    isLoading={isLoading}
                    isLoadMore={productCategoryItem?.isLoadMore}
                    searchresults={productCategoryItem?.products || []}
                    element={SmallProductCard}
                    isStorePage={true}
                />
            </AccordionPanel>
        </AccordionItem>)
}