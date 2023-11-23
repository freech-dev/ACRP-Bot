import Listener  from "../structs/listener";

export default new Listener("ready", false, async function() {
    this.logger.info(`Launched as ${this.user.username}`);
    this.logger.info(`Servers: ${this.rest.client.guilds.size}`);
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

    const registeredCommands = await this.application.getGlobalCommands();
    registeredCommands.forEach((registeredCommand) => {
        const localCommand = this.commands.find(command => command.options.name === registeredCommand.name);
        if (!localCommand) {
            this.logger.warn(`${registeredCommand.id}, was deleted`);
            this.application.deleteGlobalCommand(registeredCommand.id);
        }
    });
});