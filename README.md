# Katty

Add a cat to your website

[NPM](https://www.npmjs.com/package/katty)

## React example (ts) Quick
```ts
import { EXAMPLE_ACTIONS, EXAMPLE_SIZE, useKattyDefault } from "katty";

export const Component = (): ReactElement => {
  const platformRef = useRef<HTMLDivElement>(null);

  useKattyDefault(platformRef.current, 1.5 /* scale */);

  return <div ref={platformRef}></div>;
};
```

## React example (ts) more options
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
