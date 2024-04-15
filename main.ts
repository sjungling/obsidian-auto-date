import { Plugin, TAbstractFile, TFile, moment } from "obsidian";

export default class AutoDatePlugins extends Plugin {
	async onload() {
		this.app.vault.on("create", this.upsertDate.bind(this));
	}

	upsertDate(file: TAbstractFile) {
		if (file instanceof TFile) {
			this.app.fileManager.processFrontMatter(file, (properties) => {
				if (!properties?.date) {
					properties.date = moment(file.stat.ctime).format(
						"YYYY-MM-DD"
					);
				}
			});
		}
	}
}
