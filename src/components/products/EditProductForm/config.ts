import {
  Digital,
  Physical,
  Event,
  PTPrint,
  PTVinyl,
  PTApparel,
  PTDigital,
  PTMusic,
  PTIRLEvent,
  PTVirtualEvent,
} from "./icons";

export const ProductTabs = [
  { title: "digital", icon: Digital },
  { title: "physical", icon: Physical },
  { title: "event", icon: Event },
];

export enum TProductTabs {
  DIGITAL = "digital",
  PHYSICAL = "physical",
  EVENT = "event",
}

export const DigitalProductTypes = [
  {
    title: "digital art",
    icon: PTDigital,
    color: "#FFB800",
  },
  {
    title: "music",
    icon: PTMusic,
    color: "#A4FF49",
  },
];

export type TProductTypesJSON = typeof DigitalProductTypes;

export const PhysicalProductTypes = [
  {
    title: "print",
    icon: PTPrint,
    color: "#FE621D",
  },
  {
    title: "vinyl",
    icon: PTVinyl,
    color: "#C395FF",
  },
  {
    title: "apparel",
    icon: PTApparel,
    color: "#0FF",
  },
];

export const EventProductTypes = [
  {
    title: "irl event",
    icon: PTIRLEvent,
    color: "#66B0FF",
  },
  {
    title: "virtual event",
    icon: PTVirtualEvent,
    color: "#FF00F5",
  },
];

export enum TDigitalProductFormats {
  DIGITAL_ART = "digital art",
  MUSIC = "music",
}

export enum TPhysicalProductFormats {
  PRINT = "print",
  VINYL = "vinyl",
  APPAREL = "apparel",
}

export enum TEventProductFormats {
  IRL_EVENT = "irl event",
  VIRTUAL_EVENT = "virtual event",
}
