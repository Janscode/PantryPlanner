/*global chrome*/

function extractLdJson(){
    /*
    searchs the dom for a ld_json script object and retreives the object if it exists
    parameters: None
    returns:    JSON object if found
                null otherwise
    */
   var ldJsonScript = document.querySelector('[type="application/ld+json"');
   if (ldJsonScript != null) {
       var ldJson = JSON.parse(ldJsonScript.innerHTML);
       return ldJson;
   }
   return null;
}

function searchJson(data, name){
    /*
    searches json object for entry with specified key using breadth first search
    arguments:
        data : the json object to search
        name : the name of the entry you wish to find
    returns : 
        first entry with given name if it exists
        empty json if it doesnt exist

    */
   var fronteirQ = [data];
   while (fronteirQ && fronteirQ.length){
       var entry = fronteirQ.pop();
       if ("object" == typeof(entry)){
        for (key in entry){
            if (key==name)
            {
                return entry[key];
            }
            else 
            {
                fronteirQ.push(entry[key]);
            }
           }
       }
   }
   return {};
}

var ld_json = extractLdJson()
var recipe = {
                name: ld_json.name,
                author: searchJson("author").name,
                recipeIngredient: searchJson(ld_json, "recipeIngredient")
            };

console.log(recipe);

chrome.runtime.sendMessage(recipe);