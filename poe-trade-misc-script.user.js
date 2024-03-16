// ==UserScript==
// @name         poe-trade-misc-script
// @namespace    https://github.com/D4Enjoyer/poe-trade-misc-script
// @version      1.0.0
// @description  This userscript adds small features that either enhance the trade website or change some default behaviours.
// @author       D4Enjoyer
// @match        https://www.pathofexile.com/trade*
// @grant        none
// @license      MIT
// @icon         https://web.poecdn.com/protected/image/trade/layout/logo.png?key=aifr8Q9qj0FYhhu8_rrfhw
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/D4Enjoyer/poe-trade-misc-script/main/poe-trade-misc-script.user.js
// @downloadURL  https://raw.githubusercontent.com/D4Enjoyer/poe-trade-misc-script/main/poe-trade-misc-script.user.js
// ==/UserScript==

/* 
open-exchange-filters.js
*/

// Customize here

// Left side, Items I want: Set true/false for each item to determine if it should be clicked
const leftFilters = {
    "Currency": false, // false = currency filter open
    "Exotic Currency": true,
    "Shards & Splinters": false,
    "Fragments & Sets": true,
    "Omens": false,
    "Sanctum & Unique Relics": false,
    "Atlas Memories": false,
    "Scouting Reports": false,
    "Expedition Currency": false,
    "Delirium Orbs": false,
    "Catalysts": false,
    "Oils & Extractor": false,
    "Incubators": false,
    "Scarabs": false,
    "Delve Resonators": true,
    "Delve Fossils": true,
    "Essences": true,
    "Cards": false,
    "Maps": false,
    "Maps (Blighted)": false,
    "Maps (Blight-ravaged)": false,
    "Maps (Unique)": false,
    "Legacy Items": false,
};

// Right side, Items I have: Set true/false for each item to determine if it should be clicked
const rightFilters = {
    "Currency": false, // false = currency filter open
    "Exotic Currency": true,
    "Shards & Splinters": false,
    "Fragments & Sets": true,
    "Omens": false,
    "Sanctum & Unique Relics": false,
    "Atlas Memories": false,
    "Scouting Reports": false,
    "Expedition Currency": false,
    "Delirium Orbs": false,
    "Catalysts": false,
    "Oils & Extractor": false,
    "Incubators": false,
    "Scarabs": false,
    "Delve Resonators": true,
    "Delve Fossils": true,
    "Essences": true,
    "Cards": false,
    "Maps": false,
    "Maps (Blighted)": false,
    "Maps (Blight-ravaged)": false,
    "Maps (Unique)": false,
    "Legacy Items": false,
};

// Need to add classes to easily differentiate between left and right column
function addClasses() {
    try {
        var $panes = $(".search-advanced-pane.brown");
        if ($panes.length >= 2) {
            $panes.eq(0).addClass("left");
            // console.log("Added class left");
            $panes.eq(1).addClass("right");
            // console.log("Added class right");
        } else {
            console.error("Insufficient number of .search-advanced-pane.brown elements found.");
        }
    } catch (error) {
        console.error("Error occurred while adding classes:", error);
    }
}

// Function to click individual items
function clickItems(className, enabled) {
    try {
        $(`.search-advanced-pane.${className} .filter-title.filter-title-clickable`).each(function () {
            const itemName = $(this).text().trim();
            try {
                if (enabled[itemName]) {
                    $(this).click();
                    // console.log("Clicked on", $(this));
                }
            } catch (error) {
                console.error(`Error occurred while ${itemName}:`, error);
            }
        });
    } catch (error) {
        console.error("Error occurred while iterating through filters:", error);
    }
}

function openExchangeFiltersMain() {
    try {
        addClasses();
        clickItems("left", leftFilters);
        clickItems("right", rightFilters);
    } catch (error) {
        console.error("Error occurred in OpenExchangeFiltersMain:", error);
    }
}

/* 
exchange.search-clearer.js
*/

// Function to clear the search bar
function clearSearchBar() {
    try {
        const searchBar = $(".search-select.form-control.text");
        if (searchBar.length) {
            searchBar.val("");
            searchBar[0].dispatchEvent(new Event("input", { bubbles: true }));
            // console.log("Search bar cleared.");
        }
    } catch (error) {
        console.error("Error occurred while clearing searchbar:", error);
    }
}

// Function to check if the search bar contains text
function shouldClearSearchBar() {
    try {
        var searchBar = $(".search-select.form-control.text");
        var searchBarContainsText = searchBar.length && searchBar.val().trim() !== "";
        // console.log("Search bar contains text:", searchBarContainsText);
        return searchBarContainsText;
    } catch (error) {
        console.error("Error occurred while checking if the search bar contains text:", error);
        return false;
    }
}

// Event handler for clicking on exchange items
function handleExchangeItemClick(event) {
    try {
        if ($(event.target).closest(".exchange-filter-item").length && shouldClearSearchBar()) {
            // console.log("Clicked on .exchange-filter-item");
            clearSearchBar();
        }
    } catch (error) {
        console.error("Error occurred in handleExchangeItemClick:", error);
    }
}

function exchangeSearchClearerMain() {
    try {
        $(".search-advanced-items.exchange").on("click", handleExchangeItemClick);
        // console.log("Searchbar found, click event listeners added");
    } catch (error) {
        console.error("Error occurred in exchangeSearchClearerMain:", error);
    }
}

/* 
show-filters-on-clear.js
*/

const showFiltersOnClearNamespace = "showFiltersOnReset";

// Function to click on the 'Show Filters' button
function clickShowFiltersButton(button) {
    try {
        button.click();
        // console.log("Clicked on Show Filters button");
    } catch (error) {
        console.error("Error occurred while clicking Show Filters button:", error);
    }
}

// Click event handler for the clear button
function handleClearButtonClickReset() {
    try {
        const toggleBtn = $(this).closest(".controls-right").find(".btn.toggle-search-btn");
        const toggleText = toggleBtn.text();
        if (toggleText.includes("Show Filters")) {
            // console.log("Show Filters button found");
            clickShowFiltersButton(toggleBtn);
        }
    } catch (error) {
        console.error("Error occurred in handleClearButtonClickReset:", error);
    }
}

// Function to add click event handlers to the clear buttons
function bindClearButtonClickHandlerReset() {
    try {
        $(".btn.clear-btn")
            .off(`click.${showFiltersOnClearNamespace}`) // Must have .off for some reason to prevent double clicking
            .on(`click.${showFiltersOnClearNamespace}`, handleClearButtonClickReset);
        // console.log("bindClearButtonClickHandlerReset added click event listener");
    } catch (error) {
        console.error("Error occurred in bindClearButtonClickHandlerReset:", error);
    }
}

function showFiltersOnClearMain() {
    bindClearButtonClickHandlerReset();
}

/* 
any-as-default.js
*/

const anyAsDefaultNamespace = "anyAsDefault";

// Function to add click event handlers to the clear buttons
function bindClearButtonClickHandlerAny() {
    try {
        $(".btn.clear-btn")
            .off(`click.${anyAsDefaultNamespace}`) // Must have .off for some reason to prevent double clicking
            .on(`click.${anyAsDefaultNamespace}`, handleClearButtonClickAny);
        // console.log("bindClearButtonClickHandlerAny added click event listener");
    } catch (error) {
        console.error("Error occurred in bindClearButtonClickHandlerAny:", error);
    }
}

// Function to handle click on clear button
function handleClearButtonClickAny() {
    try {
        selectAnyOption($('.filter-title:contains("Sale Type")'));
    } catch (error) {
        console.error("Error occurred in handleClearButtonClickAny:", error);
    }
}

// Function to select "Any" option under "Sale Type" filter
function selectAnyOption(jNode) {
    try {
        const saleTypeFilter = jNode.closest(".filter-body");
        if (saleTypeFilter.length) {
            const anyOption = saleTypeFilter.find('.multiselect__element span[data-select=""] span:contains("Any")');
            if (anyOption.length) {
                anyOption.click();
                // console.log('Clicked on "Any" option under "Sale Type"');
                return;
            }
        }
    } catch (error) {
        console.error("Error occurred in selectAnyOption:", error);
    }
}

function anyAsDefaultMain() {
    selectAnyOption($('.filter-title:contains("Sale Type")'));
    bindClearButtonClickHandlerAny();
}

/* 
fuzzy-search.js
*/

// Function to handle the main fuzzy search logic
function handleFuzzySearch(e) {
    try {
        const inputValue = e.target.value;
        if (e.target.classList.contains("multiselect__input")) {
            if (
                !inputValue.includes("~") &&
                !inputValue.startsWith(" ") &&
                !inputValue.includes("*") &&
                inputValue.length > 0
            ) {
                e.target.value = "~" + inputValue;
                // console.log("Tilde inserted");
            }
            if (inputValue.startsWith("~") && inputValue.includes("*")) {
                e.target.value = inputValue.slice(1);
                // console.log("Tilde removed");
            }
        }
    } catch (error) {
        console.error("Error occurred in handleFuzzySearch:", error);
    }
}

function fuzzySearchMain() {
    try {
        document.body.addEventListener("input", function (e) {
            setTimeout(handleFuzzySearch, 10, e);
        });
    } catch (error) {
        console.error("Error occurred in fuzzySearchMain:", error);
    }
}

/* 
index.js
*/

/* eslint-disable no-undef */
fuzzySearchMain();
waitForKeyElements(".search-advanced-items.exchange", openExchangeFiltersMain);
waitForKeyElements(".search-select.form-control.text", exchangeSearchClearerMain);
waitForKeyElements(".search-bar", showFiltersOnClearMain);
waitForKeyElements('.filter-title:contains("Sale Type")', anyAsDefaultMain);
