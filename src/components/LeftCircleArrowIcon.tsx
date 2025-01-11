import * as React from 'react';
import { SVGProps, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    width='1em'
    height='1em'
    fill='currentColor'
    {...props}
  >
    <path d='M512 256a256 256 0 1 0-512 0 256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71 214.1.1c13.3 0 24 10.7 24 24s-10.7 24-24 24H177.9l71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z' />
  </svg>
);
const LeftCircleArrowIcon = memo(SvgComponent);
export default LeftCircleArrowIcon;
