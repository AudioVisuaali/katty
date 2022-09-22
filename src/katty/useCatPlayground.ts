import { useLayoutEffect } from "react"
import { Animal } from "./Animal"

type Params = {
    element: HTMLElement | null;
}

export function useKatty(params: Params): void {
    useLayoutEffect(() => {
        if (!params.element) {
            return 
        }

        const animal = new Animal({
            element: params.element,
            actions: [
                {
                    name: "jam",
                    type: "idle",
                    duration: 2,
                    sprite: "./images/pixel-art-kitten.png",
                    nextActions: [{ name: "jam" }]
                }
            ]
        })

        animal.startLiving()

        return (): void => animal.murderBrutally()
    }, [params.element])
}
