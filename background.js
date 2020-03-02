let lastPage = -1;
let currentPage = -1;

var processCommand = function(command) {
	if (command == "alt_switch_fast" && lastPage != -1) {
		chrome.tabs.get(lastPage, function(tab) {
			if(tab) {
				thisWindowId = tab.windowId;
				//invalidTab = false;

				chrome.windows.update(thisWindowId, {"focused":true});
				chrome.tabs.update(lastPage, {active:true, highlighted: true});
				//lastIntSwitchIndex = intSwitchCount;
				//break;
			}
		});
	}
};

chrome.commands.onCommand.addListener(processCommand);

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});

	chrome.tabs.onActivated.addListener(function(info) {
		lastPage = currentPage;
		currentPage = info.tabId;
	});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: { schemes: ['https', 'http'] }
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);

		//chrome.declarativeContent.on
		//console.log()

		/*chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'developer.chrome.com'},
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);*/
	});
});