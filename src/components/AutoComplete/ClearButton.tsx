import { FC } from 'react';
import { ClearButtonProps } from './types';
export const ClearButton: FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button className="auto-complete-clear" onClick={onClear}>
      X
    </button>
  );
};
