import { usePageContext } from '@renderer/usePageContext'

export function Link(props: { href?: string; className?: string; target?: string; children: React.ReactNode }) {
  const pageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
  return <a {...props} className={className} />
}
