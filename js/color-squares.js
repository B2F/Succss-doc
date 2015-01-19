var params = {};
location.search.substr(1).split("&").forEach(function(item) {params[item.split("=")[0]] = item.split("=")[1];});

var currentHeadline = defaultHeadline = parseInt(params.headline) || 0;
var yGap = parseInt(params.ygap) || 9;
if (params.bgColor) params.bgColor = "#" + params.bgColor;
var originalBackgroundColor = params.bgColor || '#56CCF2';
var variation = baseVariation = parseInt(params.variation) || 0;
isNaN(parseInt(params.speed)) ? speed = 500 : speed = parseInt(params.speed);
var breakage = parseInt(params.breakage) || 50;
var broken = false;

var subHeadline = [
  'Turn your <strong>C</strong>ascading <strong>S</strong>tlye<strong>S</strong>heets into <strong>success</strong>ful design integrations.',
  'Build your websites with SUCCSS, success guaranteed.',
  'Bring some <strong>fun</strong> to your <strong>C</strong>ascading <strong>S</strong>tlye<strong>S</strong>heets :)',
  'How sweet is using Succss? As eating a #f16 candy !',
  'Try SUCCSS, it doesn\'t mean you SUC(Kat)CSS ;)',
  'SUCCSS, you\'ll still need to fix what is broken.',
  'Fork SUCCSS, look under the hood.',
  'Check your <strong>style</strong> with SUCCSS.',
  'SUCCSS.ifzenelse.net, it\'s not easter yet did you find all the "eggs"?'
];

loadingFix();

var colors = {
  "red":"#FF0000",
  "red1":"#F54949",
  "red2":"#CC0000",
  "red3":"#990000",
  "red4":"#B04949",
  "orange":"#FF7033",
  "orange1":"#FF6F00",
  "orange2":"#FF8645",
  "orange3":"#FF9466",
  "orange4":"#FF8040",
  "green":"#2F9929",
  "green1":"#49B049",
  "green2":"#31C400",
  "green3":"#31A631",
  "green4":"#439906",
  "blue":"#3366FF",
  "blue1":"#577FF5",
  "blue2":"#5757F5",
  "blue3":"#0D8EFF",
  "blue4":"#0E6B99",
  "purple":"#7530FF",
  "purple1":"#7363FF",
  "purple2":"#5F3BFF",
  "purple3":"#7300FF",
  "purple4":"#7A33FF"
};

var colorsHex = Array();

window.onload = function() {
  if (params.tweakImg) {
    var tweakImg = document.getElementById('click-here'); 
    tweakImg.src="img/tweak-it.png";
  }
  var i=0;
  for (var c in colors) {
    i++;
    (i%2 === 1) ? suffix = "even" : suffix = "odd";
    colorSquare = document.createElement('div');
    colorSquare.id = c;
    colorSquare.className = "color-square " + suffix;
    colorSquare.style.backgroundColor = colors[c];
    aside = document.getElementById("colors");
    aside.appendChild(colorSquare);
    colorsHex.push(colors[c]);
  }
  whyLink = document.createElement('a');
  whyLink.style.top = moveSideBar() + "px";
  whyLink.id = "why-link";
  whyLink.href = "#logo";
  whyLink.innerHTML = '?';
  whyLink.title = 'These awesome color blocks are used for SUCCSS selftests.';
  aside.appendChild(whyLink);
  onColorSquaresClick(function(e) {
    document.body.style.background = colors[e.target.id];
    setTwitterShare();
  });
  imgLogo = document.getElementById('logo-image');
  imgLogo.addEventListener('click', rainbowClick);
  whyLink.addEventListener('click', function() {
    params.tweakImg = true;
    location.search = getParams();
  });
  setSubHeadline(defaultHeadline);
  params.page = setPage(params.page);
  setTwitterShare();
};

function moveSideBar() {
  var i=0;
  var startY=50;
  var x = {
    'even': 0,
    'odd':25
  };
  for (var c in colors) {
    i++;
    (i%2 == 1) ? suffix = "even" : suffix = "odd";
    startY+=yGap;
    colorSquare = document.getElementById(c);
    colorSquare.style.top = randomizePos(startY, variation).toString() + 'px';
    colorSquare.style.left = randomizePos(x[suffix], variation).toString() + 'px';
  }
  if (!broken && baseVariation >= breakage) {
    broken=true;
    variation = baseVariation += 100;
    var core = document.getElementById('core');
    var aside = document.getElementById('colors');
    var headerText = document.getElementById('header-text');
    var staticLine = document.getElementById('static-line');
    var twitterButton = document.getElementById('twitter-button');
    twitterButton.style.position = 'absolute';
    twitterButton.style.top = '174px';
    twitterButton.style.left = '23px';
    twitterButton.style.zIndex = '10000';
    document.body.removeChild(core);
    headerText.removeChild(staticLine);
    aside.style.width = "100%";
    setSubHeadline(5);
  }
  window.setTimeout(function() {moveSideBar();}, speed);
  return startY;
}

function setSubHeadline(index) {
  dynamicLine = document.getElementById('dynamic-line');
  dynamicLine.innerHTML = subHeadline[index];
  dynamicLine.style.display = "block";
  currentHeadline = index;
  setTwitterShare();
}

function randomizePos(pos, variation) {
  Math.random() > 0.5 ? sign = 1 : sign = -1;
  return pos + (Math.random()*variation * sign);
}

function randomizeBackground(colors) {
  document.body.style.backgroundColor = colors[Math.floor(Math.random()*(colors.length-1))];
}

function onColorSquaresClick(callback) {
  even = document.getElementsByClassName('color-square even');
  for (var e in even) if (!isNaN(parseInt(e))) even[e].addEventListener('click', callback);
  odd = document.getElementsByClassName('color-square odd');
  for (var o in odd) if (!isNaN(parseInt(o))) odd[o].addEventListener('click', callback);
}

function rainbowClick() {
  if (!broken && variation !== 0) {
    setDefaultState();
    window.scrollTo(0, 0);
  }
  else {
    setTimeout(function() {
      baseVariation = baseVariation + 10;
      variation = baseVariation;
      aside = document.getElementById('colors');
      asideCoords = aside.getBoundingClientRect();
      window.scrollTo(0, asideCoords.top);
      if (speed > 21) speed -= 20;
      randomizeBackground(colorsHex);
      setSubHeadline(Math.floor(Math.random()*subHeadline.length));
    },500);
  }
}

function setDefaultState() {
  variation = 0;
  document.body.style.backgroundColor = originalBackgroundColor;
  setSubHeadline(defaultHeadline);
  setTwitterShare();
}

function getParams() {
  params.tweakImg ? tweakImgParam = "&tweakImg=true" : tweakImgParam = '';
  styles = window.getComputedStyle(document.body);
  rgb = decodeURIComponent(styles.backgroundColor.replace(/[#rgba()]/g, '')).split(', ');
  hex = ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
  return "?&page="+params.page+"&variation="+variation+"&breakage="+breakage+"&speed="+speed+"&ygap="+yGap+"&bgColor="+hex+"&headline="+currentHeadline+tweakImgParam;
}

function setTwitterShare() {
  var twitterUrl = 'https://twitter.com/intent/tweet?';
  var twitterButton = document.getElementById('twitter-button');
  var url = encodeURIComponent(document.URL.replace(/(\?.*)/, '') + getParams());
  twitterButton.href = twitterUrl + 'text='+encodeURIComponent(subHeadline[currentHeadline].replace(/(<([^>]+)>)/ig,""))+"&url="+url;
}

function setPage(pageName) {
  if (!pageName) pageName = 'home';
  var page = document.getElementById(pageName);
  var menu = document.getElementById('more-infos');
  if (page) page.style.display = menu.style.display = 'block';
  return pageName;
}

function loadingFix() {
  var css = 'article, #dynamic-line { display: none;} body {background-color: '+originalBackgroundColor+'}',
      style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}