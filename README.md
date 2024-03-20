# poe-trade-misc-script - [quick install](https://raw.githubusercontent.com/D4Enjoyer/poe-trade-misc-script/main/poe-trade-misc-script.user.js)

This userscript adds small features that either enhance the trade website or change some default behaviours.

## Features

### Settings Menu

The "Misc Settings" button located at the top left opens up the settings menu where you can select which features to enable. Make sure to refresh the page after changing any settings, they won't be appplied without. Settings are stored in local storage (misc-script-settings).

### Any as default

Changes the default "Sale Type" from "Buyout or Fixed Price" to "Any". It simulates the necessary user input when visiting the trade website or clearing a search.

### Exchange search clearer

After selecting an item on the Bulk Item Exchange, the search bar will be cleared to remove highlights from items matching the search.

### Fuzzy search

Inserts a tilde (~) to the search bar and stat filters on the trade website in order to enable fuzzy search. When using an asterisk (\*) as a wild-card in custom searches, fuzzy search will be automatically disabled. Starting a search with a space will disable it aswell.

### Open Exchange filters

Opens filters (e.g. Fragments & Sets, Essences) when visiting the Bulk Item Exchange. To change the default filters that are opened, search for "Customize here" in the script then change the true/false values to your liking.

### Show filters on clear

Clearing a search on the trade website shows the filters without having to manually click the "Show Filters" button.

### Show Notes on filters

Lets you put notes on filters, useful for e.g. searches with multiple weighted sums. Notes are stored in local storage, grouped by the tab's name, therefore best used in combination with a trade addon. Notes will only be saved if tab title is different from default.
