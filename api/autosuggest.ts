import { SERVER_HOST } from "@api";
import { TData, TSearch, TSearchContext } from "@components/types";

export const getAutoSuggest = async (
    query: string,
    intent: string,
    context: TSearchContext = {}
) => {
    return _getAutoSuggest({
        descriptor: { q: query, intent: intent },
        context: context,
    });
};

export const _getAutoSuggest = async (search: TSearch) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/autosuggest/`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(search),
    });
    const searchresult = await res.json();
    return searchresult as TData[];
};
