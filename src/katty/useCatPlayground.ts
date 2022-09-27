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
                    nextActions: [{ name: "kek", possibility: 20 }]
                },
                {
                    name: "kek",
                    type: "movement",
                    nextActions: [{ name: "jam", possibility: 20 }],
                    animation: {
                        frames: 2,
                        duration: 2,
                        sprite: "./images/pixel-art-kitten.png"
                    },
                    pxPerSecond: 40,

                }
            ]
        })

        animal.startLiving()

        return (): void => animal.murderBrutally()
    }, [params.element])
}
