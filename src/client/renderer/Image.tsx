import { usePageContext } from './usePageContext';

export function Image(props: { width?: string; height?: string; srcset?: string; alt: string; className?: string, quality?: number; src?: string; loader?: Function }) {
    const pageContext = usePageContext()
    let src = props.src;
    if (typeof props.loader === "function") {
        src = props.loader(src, props.width, props.quality)
    }

    return <img {...props} src={src} className={props.className} />
}
