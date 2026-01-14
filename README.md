# Vinculum Zotero

*Pronounced: VINK-you-lum zo-TAIR-oh*

A simple plugin for Zotero 7/8 that adds a context menu item to generate Zotero links to items or collections.

The name "Vinculum" comes from Latin, meaning "chain" or "link," in the style of 16th/17th century scholarly works. It reflects the plugin's purpose of creating connections to your library items.

## Features

- Right-click on any item to copy a `zotero://` link to it
- Right-click on any collection to copy a `zotero://` link to it
- Links are automatically copied to your clipboard
- Brief notification confirms the link was copied

## Installation

1. Build the plugin:
   ```bash
   zip -r vinculum-zotero.xpi manifest.json bootstrap.js
   ```

2. In Zotero, go to Tools → Add-ons
3. Click the gear icon → Install Add-on From File
4. Select the `vinculum-zotero.xpi` file

## Usage

- Right-click on any item in your library and select "Copy Zotero Link"
- Right-click on any collection and select "Copy Zotero Link"
- The link will be copied to your clipboard and can be pasted anywhere
- The notification popup will show the title of the item/collection and the generated link

## Link Format

**Items:**
- When viewing a collection: `zotero://select/library/collections/COLLECTIONKEY/items/ITEMKEY`
  - Preserves collection context - clicking the link will show the item within that collection
- When in "My Library" or other views: `zotero://select/library/items/ITEMKEY`
  - Direct link to the item

**Collections:**
- `zotero://select/library/collections/COLLECTIONKEY`

**Multiple Items:**
- When multiple items are selected, only the first item's link is generated

These links will open the specific item or collection in Zotero when clicked.

## Development

The plugin uses a simple bootstrap architecture:
- `manifest.json` - Plugin metadata and Zotero version compatibility
- `bootstrap.js` - Main plugin code that adds menu items and generates links

## License

CC0 1.0 Universal (Public Domain Dedication)
