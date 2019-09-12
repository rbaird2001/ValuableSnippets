
function SearchEngine(endpoint, searchType) {
    this.endpoint = endpoint;
    this.type = searchType;
  }
  
  SearchEngine.prototype._search = function (str) {
    return `Queried the endpoint for ${str} and returned a value`
  }
  
  SearchEngine.prototype.manipulateForType1 = function (str) {
    return str + ' manipulated for type 1';
  }
  
  SearchEngine.prototype.manipulateForType2 = function (str) {
    return str + ' manipulated for type 2';
  }
  
  SearchEngine.prototype.search = function (str) {
    return this.type === 1 ? this.manipulateForType1(this._search(str)) : this.manipulateForType2(this._search(str));
  }
  
  let searchEngine = new SearchEngine('someEndpointDoesntMatter', 1);
  let searchEngine2 = new SearchEngine('someOtherEndpointDoesntMatter',2);
  
  console.log(searchEngine.search('foo'));
  // "Queried the endpoint for foo and returned a value manipulated for type 1"
  
  console.log(searchEngine2.search('foo'));
  // "Queried the endpoint for foo and returned a value manipulated for type 2"