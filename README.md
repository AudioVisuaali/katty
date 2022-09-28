# Katty

Add a cat to your website

## Typescript example
```ts
import { Animal, EXAMPLE_ACTIONS, EXAMPLE_SIZE } from "katty";
import { ReactElement, useEffect, useRef } from "react";

export const Block = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const animal = new Animal({
      actions: EXAMPLE_ACTIONS,
      size: EXAMPLE_SIZE,
      element: elementRef.current,
    });

    animal.startLiving();

    return (): void => animal.murderBrutally();
  }, []);

  return <div ref={elementRef}></div>;
};
```