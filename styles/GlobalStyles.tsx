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
        font-size: 1.2rem;
        background-color: ${colors.background};
        letter-spacing: 0.8px;
      }

      h2 {
        font-size: 2.6rem;
        font-weight: 700;
      }

      h3 {
        font-size: 1.7rem;
        font-weight: 700;
      }

      @media screen and (min-width: 992px) {
        body {
          padding: 82px 0 0 0;
        }
        h2 {
          font-size: 3rem;
        }

        h3 {
          font-size: 2.2rem;
        }
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

      .btn-primary {
        background-color: ${colors.primaryStrong};
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1px;
      }

      .btn.btn-primary {
        color: #fff;
        background-color: ${colors.primaryStrong};
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-primary:not(:disabled):not(.disabled):hover {
        color: #fff;
        background-color: ${colors.primaryStrongDark};
        border: 2px solid ${colors.primaryStrongDark};
      }

      .btn.btn-primary:not(:disabled):not(.disabled):active {
        color: #fff;
        background-color: ${colors.primaryStrongDark};
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-primary:not(:disabled):not(.disabled):focus {
        box-shadow: 0 0 0 0.2rem ${colors.primaryStrongTransparent};
      }

      .btn-outlinePrimary {
        background-color: transparent;
        color: ${colors.primaryStrong};
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1px;
      }

      .btn.btn-outlinePrimary {
        color: ${colors.primaryStrong};
        background-color: transparent;
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-outlinePrimary:not(:disabled):not(.disabled):hover {
        color: #fff;
        background-color: ${colors.primaryStrongDark};
        border: 2px solid ${colors.primaryStrongDark};
      }

      .btn.btn-outlinePrimary:not(:disabled):not(.disabled):active {
        color: #fff;
        background-color: ${colors.primaryStrongDark};
        border: 2px solid ${colors.primaryStrong};
      }

      .btn.btn-outlinePrimary:not(:disabled):not(.disabled):focus {
        box-shadow: 0 0 0 0.2rem ${colors.primaryStrongTransparent};
      }

      .btn-secondary {
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1px;
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

      .youtubeContainer {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        overflow: hidden;
        margin-bottom: 50px;
      }

      .youtubeContainer iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    `}</style>
  </>
);

export default GlobalStyles;
