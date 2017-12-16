var payPerHour = null;

// Get the wage we will be using for our calculations
chrome.runtime.sendMessage({requestedData: "wage"}, function(response) {
	setHourlyWage(response.wage)
	walk(document.body);
});

// Helper function to set the global wage variable
function setHourlyWage(wage) {
	this.payPerHour = wage;
}

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
				replace(node);
			}
			break;
		}
}

// Replace any units of money with HOYL
function replace(textNode) {
	textNode.nodeValue = textNode.nodeValue.
		replace(/([$][0-9]+)\.[0-9]{2}/gi, 
			function convert(x){
				return Math.round((x.substring(1)/payPerHour)*100)/100 + " HOYL";
			});
}
