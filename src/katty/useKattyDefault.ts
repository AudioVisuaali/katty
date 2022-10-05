import { useEffect, useState } from "react";

import { Action, Animal } from "./Animal";
import { EXAMPLE_ACTIONS } from "./example";

export function useKattyDefault(
  element: HTMLElement | null,
  size: number,
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
        width: size,
        height: size,
      },
      element,
    });

    animal.startLiving();

    return (): void => animal.murderBrutally();
  }, [element, hasMounted, size, actions]);
}
