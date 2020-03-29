'use strict';

let keyArr = [];

function Creature(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

function showImages() {
  let $chosen = $(this).val();
  if ($chosen === 'default') {
    $('section').fadeIn();
    // $('.photo-template').hide();
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
  for (let i = 0; i < keyArr.length; i++) {
    $('select').append(`<option value="${keyArr[i]}">${keyArr[i]}</option>`);
  }
}

function renderCreats(object, sourceID, target) {
  let $target = $(target);
  let templateMarkUp = $(sourceID).html();
  let newMarkUp = Mustache.render(templateMarkUp, object);
  $target.append(newMarkUp);

}

function loadData(getFile) {
  $.ajax(getFile)
    .then(data => {
      data.forEach((object, indx) => {
        let creature = new Creature(object);
        renderCreats(creature, '#pageone-template', '.targets');
        appendDropDown(object.keyword);
      });
      appendToKeyArr();
    });
}

function displayPage(getFile) {
  keyArr = [];
  $('section').remove();
  loadData(getFile);
}

$(document).ready(function () {
  $('select').on('change', showImages);
  $('#button').on('click', function () {
    displayPage('data/page-1.json');
  });
  $('#button2').on('click', function () {
    displayPage('data/page-2.json');
  });
  displayPage('data/page-1.json');
});

