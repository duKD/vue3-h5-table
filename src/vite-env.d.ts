/// <reference types="vite/client" />

// declare module "iscroll/build/iscroll-probe" {
//   export default class iScrollProbe {
//     constructor(element: string, options?: IScrollOptions);
//     constructor(element: HTMLElement, options?: IScrollOptions);

//     x: number;
//     y: number;
//     scale: number;

//     destroy(): void;
//     refresh(): void;
//     scrollTo(x: number, y: number, time?: number, relative?: boolean): void;
//     scrollToElement(element: string, time?: number): void;
//     scrollToElement(element: HTMLElement, time?: number): void;
//     scrollToElement(
//       element: HTMLElement,
//       time?: number,
//       offsetX?: number | boolean,
//       offsetY?: number | boolean,
//       easing?: Function
//     ): void;
//     goToPage(pageX: number, pageY: number, time?: number): void;
//     disable(): void;
//     enable(): void;
//     stop(): void;
//     zoom(scale: number, x?: number, y?: number, time?: number): void;
//     isReady(): boolean;

//     // Events
//     on(type: string, fn: (evt?: any) => void): void;
//     off(type: string, fn?: (evt?: any) => void): void;
//   }
// }

// declare class IScroll {
//   constructor(element: string, options?: IScrollOptions);
//   constructor(element: HTMLElement, options?: IScrollOptions);

//   x: number;
//   y: number;
//   scale: number;

//   destroy(): void;
//   refresh(): void;
//   scrollTo(x: number, y: number, time?: number, relative?: boolean): void;
//   scrollToElement(element: string, time?: number): void;
//   scrollToElement(element: HTMLElement, time?: number): void;
//   scrollToElement(
//     element: HTMLElement,
//     time?: number,
//     offsetX?: number | boolean,
//     offsetY?: number | boolean,
//     easing?: Function
//   ): void;
//   goToPage(pageX: number, pageY: number, time?: number): void;
//   disable(): void;
//   enable(): void;
//   stop(): void;
//   zoom(scale: number, x?: number, y?: number, time?: number): void;
//   isReady(): boolean;

//   // Events
//   on(type: string, fn: (evt?: any) => void): void;
//   off(type: string, fn?: (evt?: any) => void): void;
// }

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}
