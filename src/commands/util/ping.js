const { oneLine } = require('common-tags');
const Command = require('../base');
const chalk = require('chalk')

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		console.log(chalk.cyan.bold(`Ping was ran by:`, chalk.red.bold`${msg.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${msg.guild.name}`))
		const pingMsg = await msg.reply('Pinging...');
		return pingMsg.edit(oneLine`
			${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
			Pong! The message round-trip took ${
				(pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp)
			}ms.
			${this.client.ws.ping ? `The heartbeat ping is ${Math.round(this.client.ws.ping)}ms.` : ''}
		`);
	}
};
