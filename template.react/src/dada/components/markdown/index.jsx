import { Remarkable } from 'remarkable'
import RemarkableReactRenderer from 'remarkable-react'

// Markdown md展示
export const Markdown = ({ source }) => {
  const md = new Remarkable()
  md.renderer = new RemarkableReactRenderer()
  return md.render(source)
}
