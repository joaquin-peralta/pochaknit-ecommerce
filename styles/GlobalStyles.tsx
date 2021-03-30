import { colors } from '@utils/themes';

const GlobalStyles = () => (
  <>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        margin: 0;
        padding: 72px 0 0 0;
        color: ${colors.darkgray};
      }
    `}</style>
  </>
);

export default GlobalStyles;
