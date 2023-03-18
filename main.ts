import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {
		this.addCommand({
			id: 'insert-current-path',
			name: 'Link Current Folder',
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'l',
				},
			],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				let activeFile = this.app.workspace.getActiveFile();
				if (activeFile != null) {
					let filePath = activeFile.path;
					let pathParts = filePath.split('/');

					if (pathParts.length > 0) {
						pathParts.pop();
					}

					let dirPath = pathParts.join('/');

					let selection = editor.getSelection();
					let cursorFrom = editor.getCursor('from');
					let newStr = dirPath + '/';
					if (selection.length > 0) {
						newStr += selection + '|' + selection;
					}

					editor.replaceSelection(newStr);
					cursorFrom.ch += newStr.length;
					editor.setCursor(cursorFrom);
				}
			}
		});
	}

	onunload() {
		console.log("unloading plugin.");
	}
}
