walk(document.body);

function walk(node) 
{
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
			replace(node);
			break;
		}
}

function replace(textNode) 
{
	var payPerHour = 11.75;
	textNode.nodeValue = textNode.nodeValue.
		replace(/([$][0-9]+)\.[0-9]{2}/gi, 
			function convert(x){
				return Math.round((x.substring(1)/payPerHour)*100)/100 + " HOYL";
			});
}
