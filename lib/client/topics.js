



class Topics extends APIClientBase {

  static get namespace() {
    return 'topics';
  }

  get handle() {
    return this.get('handle');
  }

  //set handle(val) {
  //  this.update({ handle: val });
  //}

}
