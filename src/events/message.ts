import { OceanBubble } from "struts/oceanicbubble";
import Listener  from "../struts/listener";
import { Message, Uncached } from "oceanic.js";

export default new Listener("messageCreate", false, async function(this: OceanBubble, msg: Message<Uncached>) {

});