import { refresh } from '@api/authentication';
import { TData, TImage, TOption, TOrderItem } from '@components/types';
import { navigate } from 'vite-plugin-ssr/client/router';

export const requestLogin = (next: string | undefined) => {
    localStorage.removeItem("token");
    refresh().then((res) => {
        localStorage.setItem("token", res.access_token);
    }).catch((e) => {
        console.debug("Error while refresh request");
        console.debug(e);
    })
    navigate(`/login?next=${next || '/'}`);
}

export const sanityIoImageLoader = (src: string, width: string | number, quality?: number) => {
    if (src?.startsWith("http")) {
        return `https://cdn.jhattse.com/resize?width=${width}&url=${src}&quality=${quality || 75}&type=webp`
    } else {
        return `https://cdn.jhattse.com/resize?width=${width}&file=${src}&quality=${quality || 75}&type=webp`
    }
}

export const staticImageLoader = (src: string, width: string | number, quality?: number) => {
    if (src?.startsWith("http")) {
        return `https://cdn.jhattse.com/${src}`
    } else {
        return `https://cdn.jhattse.com/${src}`
    }
}

export const getFilteredResults = (input: string, data: TData[]) => {
    if (data == undefined) {
        return new Array<TOption>();
    }
    const inputValue = input != undefined ? input.trim().toLowerCase() : undefined;
    const inputLength = inputValue == undefined ? 0 : inputValue.length;

    const filteredResults = inputLength === 0 ? data : data.filter(store =>
        store?.name?.toLowerCase().slice(0, inputLength) === inputValue
    );

    const subFilteredResults = inputLength === 0 ? data : data.filter(store =>
        store?.name?.toLowerCase().includes(inputValue)
    );
    let result = [];
    if (filteredResults?.length > 5) {
        result = filteredResults;
    } else {
        result = Array.from(new Set([...filteredResults, ...subFilteredResults]));
    }
    return result.map((store) => { return { value: store?.id?.toString(), label: store.name } });
};


export const getSafeUrl = (name: string) => {
    return (name || '').replace(/ +/g, '-').replace(/[.,\?:&\+\/%\|]+/g, '-').replace(/-+/g, '-').toLowerCase();
}

export const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))

export const checkLocalhost = () => { return typeof (window) !== "undefined" && window.location.hostname.includes("localhost") }
export const humanizeCurrency = (x: number) => { return x?.toLocaleString("en-IN", { style: "currency", currency: "INR" }).split('.')[0] }
export const humanizeNumber = (x: number) => { return x?.toLocaleString('en-IN') }
export const getBusinessUrl = (url: string) => {
    return checkLocalhost() ? url : `https://business.jhattse.com${url}`
}

export const getImageUrl = (productImages: TImage[]) => {
    return (productImages || [])?.length > 0 ? productImages[0].url : "assets/esangrah-profile.png";
}

export const getImageObject = (productImages: TImage[]) => {
    return (productImages || [])?.length > 0 ? productImages[0] : { url: "assets/noimage.png", description: "No image available" };
}

export const calculateTax = (orderItems: TOrderItem[]) => {
    return Array.from(orderItems)?.reduce((prevTax, currentTax) => prevTax + (currentTax?.total_tax || 0), 0)
}

export const calculateCost = (orderItems: TOrderItem[]) => {
    return Array.from(orderItems)?.reduce((prevCost, currentCost) => prevCost + (currentCost?.total_cost || 0), 0)
}

export function groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {});
}

export const trimToLength = (name: string, charLength: number) => {
    return name?.length > charLength ? `${name?.slice(0, charLength)}...` : name;
}


export const getColor = (rating: number) => {
    return rating < 2 ? 1 : (rating < 4 ? 2 : ( rating < 4.5 ? 3 : 3))
}