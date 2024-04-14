import { Plugin } from "obsidian";

export default class AutoDatePlugins extends Plugin {
	async onload() {
		this.app.workspace.onLayoutReady(() => {
			console.info("AutoDate plugin loaded");
			this.app.vault.getMarkdownFiles().forEach((file) => {
				this.app.fileManager.processFrontMatter(file, (properties) => {
					if (!properties?.date) {
						const date = new Date(file.stat.ctime);
						const formattedDate = date.toISOString().slice(0, 10);
						properties.date = formattedDate;
					}
				});
			});
		});
	}
}
