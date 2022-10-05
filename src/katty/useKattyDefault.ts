import { useEffect, useState } from "react";

import { Action, Animal, Size } from "./Animal";
import { EXAMPLE_ACTIONS } from "./example";

export function useKattyDefault(
  element: HTMLElement | null,
  size: Size,
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
        width: size.width,
        height: size.height,
      },
      element,
    });

    animal.startLiving();

    return (): void => animal.murderBrutally();
  }, [element, hasMounted, size, actions]);
}
