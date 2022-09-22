/* eslint-disable no-param-reassign */
import { ownerDocument } from "./utils/ownerDocument";
import { applyAnimalStyles } from "./utils/styles";

type ActionType = "movement" | "idle"

type DurationRandom = { min: number, max: number }
type DurationFixed = number
type Duration = DurationRandom | DurationFixed

type NextAllowedAction = {
  name: string;
}

type ActionBase<T extends ActionType> = {
  name: string;
  type: T;
  duration: Duration;
  sprite: string;
  nextActions: NextAllowedAction[]
}

type ActionMove = ActionBase<"movement"> & {
  pxPerSecond: number;
}

type ActionIdle = ActionBase<"idle">

type Action = ActionMove | ActionIdle

type Params = {
  actions: Action[];
  element: HTMLElement;
}

export class Animal {
  public id : string;
  public actions: Action[]
  private element: HTMLElement;
  private styleElement: HTMLStyleElement | null = null;
  private currentAction: Action | null = null;
  private timeoutId: number | null = null;

  constructor(params: Params) {
    this.id = `katty-${new Date().getTime().toString()}`;
    this.actions = params.actions;
    this.element = params.element;
  }

  private getRandomAction() {
    const newAction = this.actions[Math.floor(Math.random() * this.actions.length)]
    this.currentAction = newAction

    return this.currentAction
  }
  
  private getDuration(duration: Duration): number {
    if (typeof duration === "number") {
      return duration;
    }

    return Math.floor(Math.random() * (duration.max - duration.min + 1) + duration.min);
  }

  public startLiving() {
    this.switchBoringRoutine()
  }

  private switchBoringRoutine = () => {
    const action = this.getRandomAction();
    if (!action) {
      return this.murderBrutally()
    }

    this.doBoringRoutine(action);

    const duration = this.getDuration(action.duration) * 1000
    this.timeoutId = setTimeout(this.switchBoringRoutine, duration)
  }

  private doBoringRoutine(action: Action) {
    this.setSprite(action.sprite)
  }

  private setSprite(sprite: string): void {
    const document = ownerDocument(null);
    this.styleElement = document.head.appendChild(document.createElement("style"));
    this.styleElement.innerHTML = applyAnimalStyles(this.id, sprite);
    this.element.classList.add(this.id)
  }

  public murderBrutally(): void {
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.element.classList.remove(this.id)
  }
}
