


class APIClientBase {

  constructor(handle) {
    this.id = handle;
  }

  static mergeRows(rows) {

    return rows.reduce((acc, row) => {

      for (let col in row) {
        let val = row[col];
        let base = acc[col];

        if (val != base) {

          if (base.constructor !== Array) {
            acc[col] = [acc[col]];
          }

          acc[col].push(val);
        }

      }

      return acc;
    });

  }

  get(col) {

    return this.constructor.get(this.id, col)
      .then((rows) => {

        if (rows.length > 1) {
          // return the returned rows, merged.
          let row = this.constructor.mergeRows(rows);

          return row[col];

        } else {
          // return the single row by itself.
          return rows[0] && rows[0][col];

        }

      });

  }

  static get(handle, column) {
    let meth = 'GET';
    let url = [undefined, this.namespace];

    if (handle) {
      url.push(handle);

      if (column) {
        url.push(column);
      }

    }

    return new Promise(Ajax.call.bind(Ajax, meth, url.join('/')));
  }

  static search(criteria) {
    let namespace = this.namespace;
    let meth = 'GET';
    let crit = [];

    for (let key in criteria) {
      let val = criteria[key];

      crit.push([key, val].join('='));
    }

    let query = '?' + crit.join('&');
    let url = [this.pathBase, namespace].join('/') + query;

    return new Promise(Ajax.call.bind(Ajax, meth, url));
  }

  update(updates) {
    return this.constructor.update(this.id, updates)
  }

  static update(handle, updates) {
    let namespace = this.namespace;
    let keys = Object.keys(updates);
    let url = [this.pathBase, namespace, handle];
    let meth;

    if (keys.length > 1) {
      meth = 'PATCH';

    } else {
      let col = keys[0];
      meth = 'PUT';

      url.push(col);
    }

    let urlStr = url.join('/');

    return new Promise((resolve, reject) => {
      Ajax.call(meth, urlStr, resolve, updates);
    });

  }

  static create(namespace, updates) {
    let meth = 'POST';
    let url = [this.pathBase, namespace].join('/');

    return new Promise((resolve, reject) => {
      Ajax.call(meth, url, resolve, updates);
    });

  }

  static list(criteria) {

    return this.search(criteria)
      .then((rows) => {

        let output = rows.map((row) => row.handle);
        return output.filter((row, idx, rows) => {
          return rows.indexOf(row) === idx;
        });

      });

  }

  static get pathBase() {
    return [undefined].join('/');
  }

}
