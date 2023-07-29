import { usePageContext } from './usePageContext';

export function Image(props: { width?: string; height?: string; srcset?: string; alt: string; className?: string, quality?: number; src?: string; loader?: Function; priority?: string; loading?: "eager" | "lazy" | undefined; }) {
    const pageContext = usePageContext();
    console.log(pageContext);
    let src = props.src;
    if (typeof props.loader === "function") {
        src = props.loader(src, props.width, props.quality)
    }
    return <img {...props} src={src} className={props.className} />
}
