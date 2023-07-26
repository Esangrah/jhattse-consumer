import { usePageContext } from './usePageContext'

export function Image(props: { width?: string; height?: string; src?: string; srcset?: string; alt: string; classes?: string}) {
  const pageContext = usePageContext()
  
  return <image {...props} className={classes} />
}
