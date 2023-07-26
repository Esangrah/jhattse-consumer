import { handleResponse } from ".";
import client from "./gql";
import { TSearch, TSearchContext } from "@components/types";

export const getSearch = async (
    query: string,
    intent: string,
    context: TSearchContext = {}
) => {
    return getSearchsuggest({
        descriptor: { q: query, intent: intent },
        context: context,
    });
};

export const getSearchsuggest = async (search: TSearch) => {
    const query = `
      query MyQuery {
        get_productcategories(name:"${search.descriptor.q}") {
            id
            name
        }
        get_stores(name:"${search.descriptor.q}") {
            id
            name
        }
        get_products(name:"${search.descriptor.q}") {
            id
            name
        }
        get_brands(name:"${search.descriptor.q}") {
            id
            name
        }
      }
    `;
    const result = await client.query(query, {});
    return handleResponse(null)(result);
};
