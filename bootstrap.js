var ZoteroLinkGenerator = {
  init() {
    Zotero.debug("Zotero Link Generator: Initializing");

    // Get the main Zotero window
    const window = Zotero.getMainWindow();
    if (!window) {
      Zotero.debug("Zotero Link Generator: Main window not available");
      return;
    }

    const document = window.document;

    // Add menu item to items context menu
    const itemsContextMenu = document.getElementById("zotero-itemmenu");
    if (itemsContextMenu) {
      Zotero.debug("Zotero Link Generator: Adding item menu");

      // Add separator
      const separator = document.createXULElement("menuseparator");
      separator.id = "zotero-link-generator-item-separator";
      itemsContextMenu.appendChild(separator);

      // Add menu item
      const menuItem = document.createXULElement("menuitem");
      menuItem.id = "zotero-link-generator-item";
      menuItem.setAttribute("label", "Copy Zotero Link");
      menuItem.addEventListener("command", () => this.generateItemLink());
      itemsContextMenu.appendChild(menuItem);
    } else {
      Zotero.debug("Zotero Link Generator: Item menu not found");
    }

    // Add menu item to collections context menu
    const collectionsContextMenu = document.getElementById(
      "zotero-collectionmenu",
    );
    if (collectionsContextMenu) {
      Zotero.debug("Zotero Link Generator: Adding collection menu");

      // Add separator
      const separator = document.createXULElement("menuseparator");
      separator.id = "zotero-link-generator-collection-separator";
      collectionsContextMenu.appendChild(separator);

      // Add menu item
      const menuItem = document.createXULElement("menuitem");
      menuItem.id = "zotero-link-generator-collection";
      menuItem.setAttribute("label", "Copy Zotero Link");
      menuItem.addEventListener("command", () => this.generateCollectionLink());
      collectionsContextMenu.appendChild(menuItem);
    } else {
      Zotero.debug("Zotero Link Generator: Collection menu not found");
    }
  },

  unload() {
    Zotero.debug("Zotero Link Generator: Unloading");

    const window = Zotero.getMainWindow();
    if (!window) return;

    const document = window.document;

    // Remove menu items and separators
    const itemSeparator = document.getElementById(
      "zotero-link-generator-item-separator",
    );
    if (itemSeparator) itemSeparator.remove();

    const itemMenu = document.getElementById("zotero-link-generator-item");
    if (itemMenu) itemMenu.remove();

    const collectionSeparator = document.getElementById(
      "zotero-link-generator-collection-separator",
    );
    if (collectionSeparator) collectionSeparator.remove();

    const collectionMenu = document.getElementById(
      "zotero-link-generator-collection",
    );
    if (collectionMenu) collectionMenu.remove();
  },

  generateItemLink() {
    const items = Zotero.getActiveZoteroPane().getSelectedItems();
    if (!items || items.length === 0) {
      Zotero.alert(null, "Zotero Link Generator", "No item selected");
      return;
    }

    const item = items[0];
    const itemKey = item.key;
    const itemTitle = item.getField("title");

    // Check if we're viewing a collection
    const collection = Zotero.getActiveZoteroPane().getSelectedCollection();
    let link;

    if (collection && collection.key) {
      // Include collection context in the link
      link = `zotero://select/library/collections/${collection.key}/items/${itemKey}`;
    } else {
      // Just link to the item
      link = `zotero://select/library/items/${itemKey}`;
    }

    this.copyToClipboard(link, itemTitle);
    Zotero.debug(`Zotero Link Generator: Generated link: ${link}`);
  },

  generateCollectionLink() {
    const collection = Zotero.getActiveZoteroPane().getSelectedCollection();
    if (!collection) {
      Zotero.alert(null, "Zotero Link Generator", "No collection selected");
      return;
    }

    const libraryID = collection.libraryID;
    const collectionKey = collection.key;
    const collectionName = collection.name;
    const link = `zotero://select/library/collections/${collectionKey}`;

    this.copyToClipboard(link, collectionName);
    Zotero.debug(`Zotero Link Generator: Generated link: ${link}`);
  },

  copyToClipboard(text, title) {
    const clipboard = Components.classes[
      "@mozilla.org/widget/clipboardhelper;1"
    ].getService(Components.interfaces.nsIClipboardHelper);
    clipboard.copyString(text);

    // Show brief notification
    const progressWindow = new Zotero.ProgressWindow();
    progressWindow.changeHeadline("Zotero Link Copied");
    if (title) {
      progressWindow.addDescription(title);
    }
    progressWindow.addDescription(text);
    progressWindow.show();
    progressWindow.startCloseTimer(2000);
  },
};

function install() {
  Zotero.debug("Zotero Link Generator: Installing");
}

function startup({ id, version, resourceURI, rootURI = resourceURI.spec }) {
  Zotero.debug("Zotero Link Generator: Starting up");

  // Wait for Zotero to be ready
  Zotero.uiReadyPromise.then(() => {
    Zotero.debug("Zotero Link Generator: Zotero UI ready, initializing");
    ZoteroLinkGenerator.init();
  });
}

function shutdown() {
  Zotero.debug("Zotero Link Generator: Shutting down");
  ZoteroLinkGenerator.unload();
}

function uninstall() {
  Zotero.debug("Zotero Link Generator: Uninstalling");
}
