import '../styles/globals.scss'
import { AppProps } from 'next/app'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Fragment } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useTheme } from '@material-ui/core/styles'
import 'fontsource-roboto'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme()
  return (
    <Fragment>
      <Head>
        <title>Road Weather</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
