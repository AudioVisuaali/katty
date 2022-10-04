# Katty

Add a cat to your website

## React example (ts)
```ts
import { EXAMPLE_ACTIONS, EXAMPLE_SIZE, useKatty } from "katty";

export const Component = (): ReactElement => {
  const platformRef = useRef<HTMLDivElement>(null);

  useKatty({
    actions: EXAMPLE_ACTIONS,
    size: {
      width: EXAMPLE_SIZE.width * 1.5,
      height: EXAMPLE_SIZE.height * 1.5,
    },
    element: platformRef.current,
  });

  return <div ref={platformRef}></div>;
};
```

## Typescript example
```ts
import { Animal, EXAMPLE_ACTIONS, EXAMPLE_SIZE } from "katty";
import { ReactElement, useEffect, useRef } from "react";

const animal = new Animal({
  actions: EXAMPLE_ACTIONS,
  size: EXAMPLE_SIZE,
  element: <HTML_ELEMENT>,
});

animal.startLiving();

setTimeout(() => {
  animal.murderBrutally()
}, 10 * 1000)
```
