const recipes = [
  {
    title: "French Toast",
    picture: "assets/images/french-toast.jpg",
    pic_source:
      "https://www.freepik.com/free-ai-image/view-delicious-bread-sandwiches-with-bananas_69853894.htm#fromView=uuid=95fdd9fb-f333-410f-90b1-ce3fd9d9c009",
    pic_desc: "Image by freepik",
  },
  {
    title: "Crepes",
    picture: "assets/images/crepes.jpg",
    pic_source:
      "https://www.freepik.com/free-photo/pancakes-with-strawberries-chocolate-decorated-with-mint-leaf_7121096.htm#fromView=uuid=ff31dfc3-0587-4bd4-b269-afe474df62a8",
    pic_desc: "Image by timolina on Freepik",
  },
  {
    title: "Omelette",
    picture: "assets/images/omelette.jpg",
    pic_source:
      "https://pixabay.com/photos/kitchen-omelet-eggs-food-healthy-775746/",
    pic_desc: "Image by Nemoel Nemo from Pixabay",
  },
];

let currentIndex = 0;

function onLeft() {
  if (currentIndex === 0) {
    currentIndex = 2;
  } else {
    currentIndex = currentIndex - 1;
  }
  document.getElementById("carousel-image").src = recipes[currentIndex].picture;
  document.getElementById("carousel-desc").innerHTML =
    recipes[currentIndex].title;
  document.getElementById("carousel-img-desc").href =
    recipes[currentIndex].pic_source;
  document.getElementById("carousel-img-desc").innerHTML =
    recipes[currentIndex].pic_desc;
}

function onRight() {
  if (currentIndex === 2) {
    currentIndex = 0;
  } else {
    currentIndex = currentIndex + 1;
  }
  document.getElementById("carousel-image").src = recipes[currentIndex].picture;
  document.getElementById("carousel-desc").innerHTML =
    recipes[currentIndex].title;
  document.getElementById("carousel-img-desc").href =
    recipes[currentIndex].pic_source;
  document.getElementById("carousel-img-desc").innerHTML =
    recipes[currentIndex].pic_desc;
}
