import NextDocument from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enchanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } catch (error) {
      console.log('_document.tsx error: ', error)
    }
  }
}
