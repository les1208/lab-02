'use strict';

let creaturesArray = [];


function Unicorn(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  creaturesArray.push(this);
}

Unicorn.prototype.render = function () {
  let $creaturesClone = $('photo-template').clone();
  // eslint-disable-next-line no-undef
  $('main').append($creaturesClone);
  $creaturesClone.find('h2').text(this.title);
  $creaturesClone.find('img').attr('src', this.image_url);
  $creaturesClone.find('p').text(this.description);
  $creaturesClone.removeClass('photo-template');

};

Unicorn.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let unicorn =  new Unicorn(item);
        console.log(unicorn);
        unicorn.render();
      });
    });
};

// $(() => Unicorn.readJson());

