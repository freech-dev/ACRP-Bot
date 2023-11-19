import Listener from "../struts/listener";

export default new Listener("packet", false, async function(data, shard) {
    this.vulkava.handleVoiceUpdate(data)
})