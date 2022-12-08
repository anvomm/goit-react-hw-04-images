import { RotatingLines } from 'react-loader-spinner';

import s from './Loader.module.css';

export const Loader = () => (
  <div className={s.Loader}>
    <RotatingLines
      strokeColor="blue"
      strokeWidth="4"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </div>
);
