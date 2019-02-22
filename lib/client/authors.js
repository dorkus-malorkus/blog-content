


class Authors extends APIClientBase {

  get handle() {
    return this.get('handle');
  }

  //set handle(val) {
  //  this.update({ handle: val });
  //}

  get email() {
    return this.get('email');
  }

  set email(val) {
    this.update({ email: val });
  }

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


  static get namespace() {
    return 'authors';
  }

}
