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
        font-family: 'Playfair Display', serif;
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
    `}</style>
  </>
);

export default GlobalStyles;
