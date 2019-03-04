/*
* An instance of this file gets spawned for each open tab.
* This file is responsible for the actual text replacement on the webpage.
*/

var payPerHour = null;

// Get the wage we will be using for our calculations
chrome.runtime.sendMessage(
  {requestedData: "wage"},
  function(response) {
    this.payPerHour = response.wage;
    if(response.extensionEnabled) {
      walk(document.body);
    }
});

// Traverse the DOM for Text Nodes to call replace() on 
function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E
	var child, next;
	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
				while ( child ) 
				{
					next = child.nextSibling;
					walk(child);
					child = next;
				}
			break;
		case 3: // Text node
			if(payPerHour != null) {
				replaceWithHOYL(node);
			}
			break;
		}
}

// Replaces any DOM node containing units of money with HOYL
function replaceWithHOYL(textNode) {
	textNode.nodeValue = textNode.nodeValue.replace(
    /([$][0-9]+)\,*[0-9]*(\.[0-9][0-9])?/gi, 
		function convertMoneyToHOYL(moneyAmount){
			return Math.round((moneyAmount.substring(1)/payPerHour)*100)/100 + " HOYL";
		});
}
