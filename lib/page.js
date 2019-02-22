

class Page {

  static getQueryParameter(key) {
    return Page.getQueryParameters()[key];
  }

  static getQueryParameters() {
    let rawParams = document.location.search.split(/[\&\?]/).slice(1) || [];
    let output = {};

    rawParams.forEach((rawEntry) => {
      let entryKey = rawEntry.match(/^[\w\-]+/).toString();
      let entryValue = rawEntry.match(/(?!.*\=).+$/).toString();

      output[entryKey] = decodeURI(entryValue);
    });

    return output;
  }

  static setQueryParameters(obj, shouldClearParams) {
    // apply an object to our current url's query.
    let currentParams = [];

    if (!shouldClearParams) {
      currentParams = document.location.search.split(/[\&\?]/).slice(1);
    }

    for (let key in obj) {
      currentParams = currentParams.filter((param) => {
        let matcher = new RegExp('^' + key + '(?=\=.*)');

        return !param.match(matcher);
      });

      currentParams.push(key + '=' + encodeURI(obj[key]));
    }

    document.location.search = '?' + currentParams.join('&');
  }

  static setQueryParameter(key, val, shouldClearParams) {
    // set a single parameter to the url's query.
    let currentParams = [];

    if (!shouldClearParams) {
      currentParams = document.location.search.split(/[\&\?]/).slice(1);
    }

    currentParams = currentParams.filter((param) => {
      let matcher = new RegExp('^' + key + '(?=\=.*)');
      return !param.match(matcher);
    });

    currentParams.push(key + '=' + encodeURI(val));

    document.location.search = '?' + currentParams.join('&');
  }

  static removeQueryParameter(key) {
    // remove a single parameter from the url's query.
    let currentParams = document.location.search.split(/[\&\?]/).slice(1) || [];
    currentParams.filter((param) => {
      let matcher = new RegExp('^' + key + '(?=\=.*)');
      return !param.match(matcher);
    });

    if (currentParams.length) {
      document.location.search = '?' + currentParams.join('&');
    } else {
      document.location.search = this.objectToQuery({});
    }

  }

  static clearQueryParameters() {
    // clear out the query altogether.
    document.location.search = '?' + this.objectToQuery({});
  }

  static objectToQuery(obj) {
    let output = [];

    for (let key in obj) {
      output.push(key + '=' + encodeURI(obj[key]));
    }

    return output.join('&');
  }

}
