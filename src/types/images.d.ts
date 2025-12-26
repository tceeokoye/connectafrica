declare module '*.avif' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.bmp' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.gif' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.jpg' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.jpeg' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.png' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.webp' {
  import type { StaticImageData } from 'next/image';
  const src: StaticImageData;
  export default src;
}
declare module '*.svg' {
  import * as React from 'react';
  import type { StaticImageData } from 'next/image';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: StaticImageData;
  export default src;
}
