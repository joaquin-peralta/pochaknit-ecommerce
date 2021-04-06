import { ReactNode } from 'react';
import { colors } from '@utils/themes';

type Props = {
  variant: 'primary' | 'secondary';
  text: string | ReactNode;
};

const Button = ({ variant, text }: Props) => (
  <div>
    {variant === 'primary' && (
      <button className="primary" type="button">
        {text}
      </button>
    )}

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

      .primary:active {
        border: 2px solid ${colors.primary800Transparent};
      }
    `}</style>
  </div>
);

export default Button;
