import { useLayoutEffect } from "react"
import { Action, Animal, AnimalOptions, Size } from "./Animal"

type KattyOptions = {
    actions: Action[];
    size: Size;
    element: HTMLElement | null
}

export function useKatty(params: KattyOptions): void {
    useLayoutEffect(() => {
        if (!params.element) {
            return 
        }

        const animal = new Animal(params as AnimalOptions);

        animal.startLiving()

        return (): void => animal.murderBrutally()
    }, [params.element])
}
