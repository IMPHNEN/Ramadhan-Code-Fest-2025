document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: "#text",
    width: ["0", "100%"],
    duration: 3000,
    easing: "easeInOutSine",
    begin: function () {
      document.getElementById("text").style.overflow = "hidden";
      document.getElementById("text").style.display = "inline-block";
    },
    complete: function () {
      document.getElementById("cursor").style.animation = "none";
      setTimeout(() => {
        document.getElementById("handwrittenText").style.display = "none";
        const video = document.getElementById("video");
        console.log(video);
        video.style.display = "block";
        video.load();
        video.play();
        video.muted = false;
      }, 1000);
    },
  });
});
