import { ReactNode } from 'react';
import { colors } from '@utils/themes';

type Props = {
  variant: 'primary' | 'secondary' | 'purchaseNative' | 'purchaseExt';
  content: string | ReactNode;
};

const Button = ({ variant, content }: Props) => (
  <div>
    <button className={`${variant}`} type="button">
      {content}
    </button>

    <style jsx>{`
      button {
        width: 154px;
        height: auto;
        padding: 0.5rem 0.5rem;
        border: 0;
        border-radius: 4px;
      }

      .primary {
        background-color: ${colors.primary800};
        color: #eee;
      }

      .primary:hover {
        background-color: ${colors.primary800Dark};
      }

      .primary:active,
      .primary:focus {
        box-shadow: 0px 0px 1px 3px ${colors.primary800Transparent};
      }

      .secondary {
        background: transparent;
        color: ${colors.darkgray};
        border: 1px solid ${colors.darkgray};
      }

      .secondary:hover {
        background-color: ${colors.darkgray};
        color: #eee;
      }

      .secondary:active,
      .secondary:focus {
        box-shadow: 0px 0px 1px 3px ${colors.darkgrayTransparent};
      }

      .purchaseNative {
        background-color: ${colors.primaryStrong};
        color: #eee;
      }

      .purchaseNative:hover {
        background-color: ${colors.primaryStrongDark};
      }

      .purchaseNative:active,
      .purchaseNative:focus {
        box-shadow: 0px 0px 1px 3px ${colors.primaryStrongTransparent};
      }

      .purchaseExt {
        background-color: ${colors.triadic100};
        color: #eee;
      }

      .purchaseExt:hover {
        background-color: ${colors.triadic100Dark};
      }

      .purchaseExt:active,
      .purchaseExt:focus {
        box-shadow: 0px 0px 1px 3px ${colors.triadic100Transparent};
      }
    `}</style>
  </div>
);

export default Button;
