'use strict';


const creatureArray = [];
const key = [];


function Creature(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  creatureArray.push(this);
}

Creature.prototype.render = function () {
  let $creatureClone = $('.photo-template').clone();
  $creatureClone.find('h2').text(this.title);
  $creatureClone.find('img').attr('src', this.image_url);
  $creatureClone.find('img').attr('alt', this.title);
  $creatureClone.find('p').text(this.description);
  $creatureClone.removeClass('photo-template');
  $creatureClone.attr('class', this.keyword);
  $('main').append($creatureClone);

};

$(document).ready(function () {
  $.ajax('/data/page-1.json')
    .then(data => {
      data.forEach((obj, idx) => {
        let creature = new Creature(obj.image_url, obj.title, obj.description, obj.keyword, obj.horns);
        creature.render();
      });
    });
});

function dropDown() {
  allcreatureObjs.forEach(animal => {
    if (!key.includes(animal.keyword)) {
      key.push(animal.keyword);
    }
  });
}



