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
        font-family: 'Thasadith', sans-serif;
      }

      h2 {
        font-size: 3rem;
        font-weight: 700;
      }

      // ProfilePage
      .avatar {
        border-radius: 50%;
      }

      // SlideShowGallery
      .slide-thumbnail {
        opacity: 0.6;
      }

      .slide-active,
      .slide-thumbnail:hover {
        cursor: pointer;
        opacity: 1;
      }

      .btn-local {
        background-color: #fff;
        color: #000;
      }

      .btn.btn-local {
        color: #000;
        background-color: #fff;
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-local:not(:disabled):not(.disabled):hover {
        color: #fff;
        background-color: ${colors.primaryStrongDark};
        border: 2px solid ${colors.primaryStrongDark};
      }

      .btn.btn-local:not(:disabled):not(.disabled):active {
        color: #000;
        background-color: #fff;
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-local:not(:disabled):not(.disabled):focus {
        box-shadow: 0 0 0 0.2rem ${colors.primaryStrongTransparent};
      }

      .btn-ext {
        background-color: #fff;
        color: #000;
      }

      .btn.btn-ext {
        color: #000;
        background-color: #fff;
        border: 2px solid ${colors.triadic100};
      }

      .btn.btn-ext:not(:disabled):not(.disabled):hover {
        color: #fff;
        background-color: ${colors.triadic100Dark};
        border: 2px solid ${colors.triadic100Dark};
      }

      .btn.btn-ext:not(:disabled):not(.disabled):active {
        color: #000;
        background-color: #fff;
        border: 2px solid ${colors.triadic100};
      }

      .btn.btn-ext:not(:disabled):not(.disabled):focus {
        box-shadow: 0 0 0 0.2rem ${colors.triadic100Transparent};
      }
    `}</style>
  </>
);

export default GlobalStyles;
