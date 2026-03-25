window.addEventListener("DOMContentLoaded", () => {

  const Canvas = document.getElementById("canvas");

  if (!Canvas) {
    console.error("canvasが見つかりません");
    return;
  }

  const ctx = Canvas.getContext("2d");

  function resize() {
    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  let elements = [];

  function circle(x, y, s) {
    return {
      x,
      y,
      r: 12 * s,
      w: 5 * s,
      draw(t) {
        ctx.beginPath();
        ctx.arc(
          this.x + Math.sin((t + x) / 100) * 3,
          this.y + Math.sin((t + y) / 100) * 4,
          this.r,
          0,
          Math.PI * 2
        );
        ctx.lineWidth = this.w;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      }
    };
  }

  for (let i = 0; i < 80; i++) {
    elements.push(
      circle(
        Math.random() * Canvas.width,
        Math.random() * Canvas.height,
        Math.random()
      )
    );
  }

  function animate() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    const t = Date.now();

    elements.forEach(e => e.draw(t));

    requestAnimationFrame(animate);
  }

  animate();

});