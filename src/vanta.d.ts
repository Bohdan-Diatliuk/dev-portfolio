/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vanta/dist/vanta.clouds.min' {
  const Clouds: (options: any) => { destroy: () => void };
  export default Clouds;
}

declare module 'three' {
  const THREE: any;
  export = THREE;
}