import { useEffect, useState } from "react";

import { Action, Animal } from "./Animal";
import { EXAMPLE_ACTIONS, EXAMPLE_SIZE } from "./example";

export function useKattyDefault(
  element: HTMLElement | null,
  scale: number,
  actions: Action[] = EXAMPLE_ACTIONS,
): void {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    if (!element) {
      return;
    }

    const animal = new Animal({
      actions,
      size: {
        width: EXAMPLE_SIZE.width * scale,
        height: EXAMPLE_SIZE.height * scale,
      },
      element,
    });

    animal.startLiving();

    return (): void => animal.murderBrutally();
  }, [element, hasMounted, actions, scale]);
}
