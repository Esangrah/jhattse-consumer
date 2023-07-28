import { SERVER_HOST } from "@api";
import { TSearch } from "@components/types";
import fetch from 'cross-fetch';

export const search = async (search: TSearch,) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/search/`, {
                method: "POST",
                headers: {"Content-Type": "application/json;charset=utf-8"},
                body: JSON.stringify(search)
            })
    const searchresult = await res.json()
    return searchresult;
}