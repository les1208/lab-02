'use strict';


const keyArr = [];


function Creature(object) {
  this.image_url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
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

function showImages() {
  let $chosen = $(this).val();
  if ($chosen === 'default') {
    $('section').fadeIn();
    $('.photo-template').hide();
  } else {
    $('section').hide();
    $('.' + $chosen).fadeIn();
  }
}

function appendDropDown(keyword) {
  if (!keyArr.includes(keyword)) {
    keyArr.push(keyword);
  }
}
function appendToKeyArr() {
  keyArr.sort();
  for ( let i = 0; i < keyArr.length; i++) {
    $('select').append(`<option value="${keyArr[i]}">${keyArr[i]}</option>`);
  }
}

function loadData() {
  $.ajax('/data/page-1.json')
    .then(data => {
      data.forEach((object, indx) => {
        let creature = new Creature(object);
        creature.render();
        appendDropDown(object.keyword);
      });
      appendToKeyArr();
    });
}

$(document).ready(function () {
  $('select').on('change', showImages );
  loadData();
});

