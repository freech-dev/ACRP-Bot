import Listener  from "../struts/listener";

export default new Listener("ready", false, async function() {
    this.logger.info(`Launched as ${this.user.username}`);
    this.logger.info(`Guilds: ${this.rest.client.guilds.size}`);
    this.vulkava.start(this.user.id);

    this.commands.forEach((command) => {
        if (command.options.slash) {
            this.application.createGlobalCommand({
                name: command.options.name,
                description: command.options.description,
                type: command.options.slash.type,
                options: command.options.slash.options
            })
        }
    });
});