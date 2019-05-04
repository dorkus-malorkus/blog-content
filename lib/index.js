function footerAction(targ) {
  let id = targ.innerText.toLowerCase();
  let handle = id.replace(/\s/, '-');

  Page.setQueryParameter('handle', handle, true);
}

function setContent(content) {
  this.innerHTML = content;
}

function populateTopics(handles) {

  handles.forEach((handle) => {
    let newEl = document.createElement(this.tagName);

    newEl.classList = this.classList;
    newEl.innerHTML = this.innerHTML;

    setContent.call(newEl, handle);

    let url = document.location.toString().match(/^.+(?=\?)/);
    let query = Page.objectToQuery({ 'topic': newEl.innerText });

    newEl.href = [url, query].join('?');
    newEl.classList.remove('template');

    this.parentElement.prepend(newEl);
  });

}

function populateEntries(handles) {

  handles.forEach((handle) => {
    let parameters = window.parameters;
    let post = new Posts(handle);
    let newEl = document.createElement(this.tagName);

    newEl.id = handle;
    newEl.classList = this.classList;
    newEl.innerHTML = this.innerHTML;
    newEl.style = this.style;

    let headerEl = newEl.getElementsByClassName('header')[0];
    let subheaderEl = newEl.getElementsByClassName('subheader')[0];
    let bodyEl = newEl.getElementsByClassName('body')[0];
    let authorEl = newEl.getElementsByClassName('author')[0];
    let dateEl = newEl.getElementsByClassName('date')[0];

    post.body.then(setContent.bind(bodyEl));
    post.header.then((header) => {
      setContent.call(headerEl, header);

      if (parameters.handle) {
        document.title = header;
      }

    });
    post.subheader.then(setContent.bind(subheaderEl));


    post.author.then((author) => {
      let query = Page.objectToQuery({ 'handle': author });

      setContent.call(authorEl, author);

      authorEl.href = ['/', query].join('?');
    });

    post.created.then((timestamp) => {
      let date = new Date(timestamp);

      setContent.call(dateEl, date.toLocaleDateString());
    });

    post.expanded.then((expanded) => {
      if (expanded) {
        newEl.classList.add('expanded');
      }

    });

    newEl.classList.remove('template');

    let anchor = newEl.getElementsByTagName('a')[0];

    if (anchor.href.match(/\?[\w=%]+$/)) {
      anchor.href += '&';
    } else {
      anchor.href += '?';
    }

    anchor.href += ['handle', newEl.id].join('=');

    this.parentElement.append(newEl);
  });

}
