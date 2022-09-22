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
            size: {
                height: 64,
                width: 64,
            },
            actions: [
                {
                    name: "jam",
                    type: "idle",
                    animation: {
                        duration: 2,
                        sprite: "./images/pixel-art-kitten.png",
                        frames: 2,
                    },
                    nextActions: [{ name: "jam" }]
                }
            ]
        })

        animal.startLiving()

        return (): void => animal.murderBrutally()
    }, [params.element])
}
