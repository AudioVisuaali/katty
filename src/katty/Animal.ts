/* eslint-disable no-param-reassign */
import { ownerDocument } from "./utils/ownerDocument";
import { applyAnimalStyles } from "./utils/styles";

type ActionType = "movement" | "idle"

export type Size = {
  width: number;
  height: number;
}

type DurationRandom = { min: number, max: number }
type DurationFixed = number
type Duration = DurationRandom | DurationFixed

type NextAllowedAction = {
  name: string;
}

export type ActionAnimation = {
  frames: number;
  duration: Duration;
  sprite: string;
}

type ActionBase<T extends ActionType> = {
  name: string;
  type: T;
  nextActions: NextAllowedAction[];
  animation: ActionAnimation;
}

type ActionMove = ActionBase<"movement"> & {
  pxPerSecond: number;
}

type ActionIdle = ActionBase<"idle">

type Action = ActionMove | ActionIdle

type Params = {
  actions: Action[];
  size: Size;
  element: HTMLElement;
}

export class Animal {
  // Properties
  public id : string;
  private size: Size;

  // Actions
  public actions: Action[]
  private currentAction: Action | null = null;
  private timeoutId: number | null = null;

  // Elements
  private element: HTMLElement;
  private styleElement: HTMLStyleElement | null = null;

  constructor(params: Params) {
    this.id = `katty-${new Date().getTime().toString()}`;
    
    this.actions = params.actions;
    this.element = params.element;
    this.size = params.size;
  }

  private getNextBoringRoutineOptions(): Action[] {
    if (!this.currentAction) {
      return this.actions;  
    }

    const nextActions = this.currentAction.nextActions;

    return this.actions.filter(action => nextActions.some(nextAction => nextAction.name === action.name))
  }

  private getNextBoringRoutine() {
    const possibilities = this.getNextBoringRoutineOptions()

    const newAction = possibilities[Math.floor(Math.random() * possibilities.length)]
    
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
    const action = this.getNextBoringRoutine();
    if (!action) {
      return this.murderBrutally()
    }

    this.setLimbMovement(action.animation)

    const duration = this.getDuration(action.animation.duration) * 1000
    this.timeoutId = setTimeout(this.switchBoringRoutine, duration)
  }

  private setLimbMovement(animation: ActionAnimation): void {
    const prevStyleElement = this.styleElement
    
    const document = ownerDocument(null);
    this.styleElement = document.head.appendChild(document.createElement("style"));
    this.styleElement.innerHTML = applyAnimalStyles(this.id, this.size, animation);
    this.element.classList.add(this.id)

    if (prevStyleElement) {
      prevStyleElement.remove();
    }
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
