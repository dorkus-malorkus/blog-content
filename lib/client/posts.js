


class Posts extends APIClientBase {

  get handle() {
    return this.get('handle');
  }

  //set handle(val) {
  //  this.update({ handle: val });
  //}

  get author() {
    return this.get('author');
  }

  set author(val) {
    this.update({ author: val });
  }

  get header() {
    return this.get('header');
  }

  set header(val) {
    this.update({ header: val });
  }

  get body() {
    return this.get('body');
  }

  set body(val) {
    this.update({ body: val });
  }

  get subheader() {
    return this.get('subheader');
  }

  set subheader(val) {
    this.update({ subheader: val });
  }


  get topics() {
    return this.get('topic');
  }

  //set topics(val) {
  //  this.update({ topics: val });
  //}

  get active() {
    return this.get('active');
  }

  set active(val) {
    this.update({ active: val });
  }

  get commenting() {
    return this.get('commenting');
  }

  set commenting(val) {
    this.update({ commenting: val });
  }

  get searchable() {
    return this.get('searchable');
  }

  set searchable(val) {
    this.update({ searchable: val });
  }

  get expanded() {
    return this.get('expanded');
  }

  set expanded(val) {
    this.update({ expanded: val });
  }


  get updated() {
    return this.get('updated');
  }

  //set updated(val) {
  //  this.update({ updated: val });
  //}

  get created() {
    return this.get('created');
  }

  //set created(val) {
  //  this.update({ created: val });
  //}

  static get namespace() {
    return 'posts';
  }

}
