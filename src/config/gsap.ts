import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";

const enableGsapPlugins = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(TextPlugin);
};

export default enableGsapPlugins;
