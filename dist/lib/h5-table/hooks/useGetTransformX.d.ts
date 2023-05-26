import { type Ref } from "vue";
export default function useGetTransformX(target: Ref<HTMLElement | null>, tablewidth: Ref<number>, tableContent: Ref<number>, disable: Ref<boolean>, bottomLoadEvent: Function, offset: number, stopPropagation?: boolean): Ref<number>[];
