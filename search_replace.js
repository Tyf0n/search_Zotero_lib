//https://www.zotero.org/support/dev/client_coding/javascript_api
var Zotero = Components.classes["@zotero.org/Zotero;1"]
				// Currently uses only nsISupports
				//.getService(Components.interfaces.chnmIZoteroService).
				.getService(Components.interfaces.nsISupports)
				.wrappedJSObject;

function rep(longtitle, shorttitle) {
var fieldName = "publicationTitle";
var fieldName1 = "journalAbbreviation";
//var oldValue = "Carbohydrate Research";
//var newValue = "Carbohydr. Res.";
var oldValue = longtitle;
var newValue = shorttitle;

var fieldID = Zotero.ItemFields.getID(fieldName);
var fieldID1 = Zotero.ItemFields.getID(fieldName1);
var s = new Zotero.Search;
s.addCondition(fieldName, 'is', oldValue);
var ids = s.search();
if (ids) {
	for each(var id in ids) {
		var item = Zotero.Items.get(id);
		var mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName1);
		item.setField(mappedFieldID ? mappedFieldID : fieldID1, newValue);
		item.save();
	}
	alert(ids.length + " items updated");
}
else {
	alert("No items found");
}
}

function cop(clec) {
var fieldName = "postType";
var fieldName1 = "extra";
var oldValue = clec;

//var collectionid = pow_server.GET.id;
// or some other way of finding the collectionID here
var collectionid = z.Collections.getID(oldValue);
var collection = z.Collections.get(collectionid);
var items = collection.getChildItems();
// or you can obtain an array of itemIDs instead:
var ids = collection.getChildItems(true);

if (ids) {
	for each(var id in ids) {
		var item = Zotero.Items.get(id);
		var itemnum = item.getField("shortTitle");
		var mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName1);
		item.setField(fieldID1, itemnum);
		item.save();
	}
	alert(ids.length + " items updated");
}
else {
	alert("No items found");
}
}


rep("Chemometrics and Intelligent Laboratory Systems", "Chemom. Intell. Lab. Syst.")
rep("Annual Review of Physical Chemistry", "Annu. Rev. Phys. Chem.")
rep("Journal of Computational Physics", "J. Comput. Phys.")
rep("Molecular Simulation", "Mol. Simul.")
rep("Journal of Computer-Aided Molecular Design", "J. Comput.-Aided Mol. Des.")
rep("Annual Review of Biophysics", "Annu. Rev. Biophys.")
rep("Proceedings of the National Academy of Sciences", "Proc. Natl. Acad. Sci. U. S. A.")
rep("Chemical Physics Letters", "Chem. Phys. Lett.")
rep("Journal of Chemical Physics", "J. Chem. Phys.")
rep("Molecular Physics", "Mol. Phys.")

