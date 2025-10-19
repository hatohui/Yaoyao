import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import { Draggable } from "gsap/Draggable";

const enableGsapPlugins = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(Draggable);
};

export default enableGsapPlugins;
