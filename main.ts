import { Plugin, TAbstractFile, TFile } from "obsidian";

export default class AutoDatePlugins extends Plugin {
	async onload() {
		this.app.vault.on("create", this.upsertDate.bind(this));
	}

	upsertDate(file: TAbstractFile) {
		if (file instanceof TFile) {
			this.app.fileManager.processFrontMatter(file, (properties) => {
				if (!properties?.date) {
					const date = new Date(file.stat.ctime);
					const formattedDate = date.toISOString().slice(0, 10);
					properties.date = formattedDate;
				}
			});
		}
	}
}
