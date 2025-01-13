import { FC } from 'react';
import cn from 'classnames';

interface Props {
  className: string;
  progressPercentage: number;
  size: string;
}

const RadialProgress: FC<Props> = ({ className, progressPercentage, size }) => {
  return (
    <div
      className={cn(`radial-progress ${className}`, {
        'text-red-600': progressPercentage <= 25,
        'text-orange-500': progressPercentage > 25 && progressPercentage <= 50,
        'text-yellow-400': progressPercentage > 50 && progressPercentage <= 75,
        'text-green-500': progressPercentage > 75 && progressPercentage <= 100,
      })}
      // @ts-expect-error: value exists using DaisyUI, this is a dummy error
      style={{ '--value': progressPercentage, '--size': size }}
      role='progressbar'
    >
      <span className='text-neutral font-bold'>{`${progressPercentage}%`}</span>
    </div>
  );
};

export default RadialProgress;
