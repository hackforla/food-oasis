import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function useBreakpoints() {
  const theme = useTheme()
  return {
    isMobile: useMediaQuery(theme.breakpoints.only('xs'), { noSsr: true }),
    isTablet: useMediaQuery(theme.breakpoints.only('sm'), { noSsr: true }),
    isDesktop: useMediaQuery(theme.breakpoints.up('md'), { noSsr: true }),
  }
}
