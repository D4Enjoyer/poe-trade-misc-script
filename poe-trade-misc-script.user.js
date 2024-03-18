// ==UserScript==
// @name         poe-trade-misc-script
// @namespace    https://github.com/D4Enjoyer/poe-trade-misc-script
// @version      1.1.0
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
toast-message.js
*/

// Function to create and show a toast message
//"success" and "error" as type
function showToast(message, type) {
    try {
        const toast = document.createElement("div");
        toast.classList.add("toast", `toast-${type}`);

        const toastMessage = document.createElement("div");
        toastMessage.classList.add("toast-message");
        toastMessage.textContent = message;

        toast.appendChild(toastMessage);

        const toastContainer = document.querySelector(".toast-bottom-center");

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    } catch (error) {
        console.error("Error in showToast:", error);
    }
}

/*
close-modal.js
*/



// Function to close Settings
function closeSettings() {
    try {
        const overlay = document.querySelector(".overlay");
        const modal = document.querySelector(".modal");

        overlay.style.display = "none";
        modal.style.display = "none";

        overlay.parentNode.removeChild(overlay);
        modal.parentNode.removeChild(modal);

        showToast("Settings saved. Refresh to apply changes!", "success");
    } catch (error) {
        console.error("Error when trying to close settings:", error);
    }
}

/*
settings-utils.js
*/

// Function to save checkbox states to local storage
function saveCheckboxStates(states) {
    try {
        localStorage.setItem("misc-script-settings", JSON.stringify(states));
    } catch (error) {
        console.error("Error in saveCheckboxStates:", error);
    }
}

// Function to load checkbox states from local storage
function loadCheckboxStates() {
    try {
        const storedStates = localStorage.getItem("misc-script-settings");
        return storedStates ? JSON.parse(storedStates) : {};
    } catch (error) {
        console.error("Error in loadCheckboxStates:", error);
    }
}

// Function to save a specific checkbox state to local storage
function saveCheckboxState(checkboxId, isChecked) {
    try {
        const states = loadCheckboxStates();
        states[checkboxId] = isChecked;
        saveCheckboxStates(states);
    } catch (error) {
        console.error("Error in saveCheckboxState:", error);
    }
}

// Function to load a specific checkbox state from local storage
function loadCheckboxState(checkboxId) {
    try {
        const states = loadCheckboxStates();
        return Object.prototype.hasOwnProperty.call(states, checkboxId) ? states[checkboxId] : false;
    } catch (error) {
        console.error("Error in loadCheckboxState:", error);
    }
}

// Functions to check whether features are enbaled
function isFuzzySearchEnabled() {
    const state = loadCheckboxState("Fuzzy search");
    return state === true;
}

function isOpenExchangeFiltersEnabled() {
    const state = loadCheckboxState("Open Exchange filters");
    return state === true;
}

function isExchangeSearchClearerEnabled() {
    const state = loadCheckboxState("Exchange search clearer");
    return state === true;
}

function isShowFiltersOnClearEnabled() {
    const state = loadCheckboxState("Show filters on clear");
    return state === true;
}

function isAnyAsDefaultEnabled() {
    const state = loadCheckboxState("Any as Default");
    return state === true;
}

/*
open-modal.js
*/




// Function to open Settings
function openSettings() {
    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.addEventListener("click", closeSettings);

    // Modal
    const modal = document.createElement("div");
    modal.className = "modal";

    // Header
    const modalHeader = document.createElement("h1");
    modalHeader.className = "modal-header";
    modalHeader.textContent = "Misc Script Settings";
    modal.appendChild(modalHeader);

    // Checkboxes
    const checkboxes = [
        "Any as Default",
        "Exchange search clearer",
        "Fuzzy search",
        "Open Exchange filters",
        "Show filters on clear",
    ];
    checkboxes.forEach((checkboxId) => {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = checkboxId;
        checkbox.className = "checkbox";
        checkbox.checked = loadCheckboxState(checkboxId);
        checkboxContainer.appendChild(checkbox);

        const label = document.createElement("label");
        label.htmlFor = checkboxId;
        label.textContent = checkboxId;
        label.className = "checkbox-label";
        checkboxContainer.appendChild(label);

        modal.appendChild(checkboxContainer);

        checkbox.addEventListener("change", (event) => {
            const isChecked = event.target.checked;
            saveCheckboxState(checkboxId, isChecked);
        });
    });

    // Reaload Info text
    const reloadInfoContainer = document.createElement("div");
    reloadInfoContainer.className = "reload-info-container";

    const realoadInfo = document.createElement("span");
    realoadInfo.textContent = "Refresh page to apply changes!";
    reloadInfoContainer.appendChild(realoadInfo);

    modal.appendChild(reloadInfoContainer);

    // Footer
    const modalFooter = document.createElement("h2");
    modalFooter.className = "modal-footer";
    modalFooter.textContent = "Close";
    modal.appendChild(modalFooter);
    modalFooter.addEventListener("click", closeSettings);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    overlay.style.display = "block";
    modal.style.display = "block";
}

/*
menu-button.js
*/



function createMiscSettingsButton() {
    try {
        const button = document.createElement("button");
        button.className = "settings-btn";
        button.textContent = "Misc Settings";

        const linkBackElement = document.querySelector(".linkBack");

        if (linkBackElement) {
            linkBackElement.appendChild(button);
            button.addEventListener("click", openSettings);
        }
    } catch (error) {
        console.error("Error creating the settings button:", error);
    }
}

/* 
index.js
*/














/* eslint-disable no-undef */
createMiscSettingsButton();

if (isFuzzySearchEnabled()) {
    fuzzySearchMain();
}
if (isOpenExchangeFiltersEnabled()) {
    waitForKeyElements(".search-advanced-items.exchange", openExchangeFiltersMain);
}
if (isExchangeSearchClearerEnabled()) {
    waitForKeyElements(".search-select.form-control.text", exchangeSearchClearerMain);
}
if (isShowFiltersOnClearEnabled()) {
    waitForKeyElements(".search-bar", showFiltersOnClearMain);
}
if (isAnyAsDefaultEnabled()) {
    waitForKeyElements('.filter-title:contains("Sale Type")', anyAsDefaultMain);
}

(function(){
  const $style = document.createElement('style');

  $style.innerHTML = `/* settings menu button */
.settings-btn {
    margin-left: 15px;
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
    /* color: #00b6ff; */
}

.settings-btn:hover {
    color: #fff;
    /* color: #00d2ff;  */
}

/* overlay */
.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

/* modal */
.modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(206, 206, 206);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
}

/* Modal Header */
.modal-header {
    padding: 15px;
    background-color: rgb(177, 177, 177);
    color: rgb(0, 0, 0);
    text-align: center;
    cursor: default;
}

/* Modal Footer */
.modal-footer {
    padding: 15px;
    background-color: rgb(177, 177, 177);
    color: rgb(0, 0, 0);
    cursor: default;
    text-align: center;
}
.modal-footer:hover {
    background-color: rgb(190, 190, 190);
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
    font-size: large;
    color: rgb(0, 0, 0);
    font-size: 23px;
}

.checkbox {
    width: 25px;
    height: 25px;
    cursor: default;
}

.checkbox-label {
    font-weight: normal;
    margin-left: 10px;
    cursor: default;
}

.reload-info-container {
    color: rgb(0, 0, 0);
    cursor: default;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
}
`;

  if (document.readyState === 'complete' ||
      document.readyState === 'interactive') {
    document.body.appendChild($style);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild($style);
    });
  }
})();