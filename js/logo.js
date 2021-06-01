$(function () {
  var canvas = $("#c");
  var canvasHeight;
  var canvasWidth;
  var ctx;
  var dt = 0.1;

  var pointCollection;

  function init() {
    updateCanvasDimensions();

    var g = [
      new Point(8.1, 5.8, 0.0, 8, "#ed9d33"),
      new Point(7.5, 17.4, 0.0, 8, "#d44d61"),
      new Point(6.8, 27.2, 0.0, 6, "#4f7af2"),
      new Point(7.3, 37.8, 0.0, 6, "#ef9a1e"),
      new Point(7.5, 49.5, 0.0, 8, "#4976f3"),
      new Point(18.9, 53.8, 0.0, 6, "#269230"),
      new Point(29.1, 53.8, 0.0, 6, "#1f9e2c"),
      new Point(38.1, 48.9, 0.0, 6, "#1c48dd"),
      new Point(39.8, 37.3, 0.0, 8, "#2a56ea"),
      new Point(39.1, 27.6, 0.0, 6, "#3355d8"),
      new Point(40.7, 17.4, 0.0, 6, "#36b641"),
      new Point(39.5, 7.4, 0.0, 6, "#2e5def"),
      new Point(28.4, 29, 0.0, 6, "#d53747"),
      new Point(17.7, 29.0, 0.0, 6, "#eb676f"), //ㅂ
      new Point(60.7, 43.8, 0.0, 6, "#f9b125"),
      new Point(73.4, 42.9, 0.0, 6, "#de3646"),
      new Point(87.1, 40.6, 0.0, 6, "#2a59f0"),
      new Point(100, 40, 0.0, 8, "#eb9c31"),
      new Point(61.6, 27.6, 0.0, 6, "#c41731"),
      new Point(72.9, 28.9, 0.0, 6, "#d82038"),
      new Point(86.4, 31.5, 0.0, 6, "#5f8af8"),
      new Point(99.7, 24.6, 0.0, 6, "#efa11e"),
      new Point(99.8, 8, 0.0, 8, "#2e55e2"),
      new Point(99.7, 54.7, 0.0, 6, "#4167e4"),
      new Point(99.9, 71, 0.0, 6, "#0b991a"),
      new Point(99.6, 83.7, 0.0, 6, "#4869e3"), //ㅕ
      new Point(14.7, 81.9, 0.0, 8, "#3059e3"),
      new Point(33.3, 81.2, 0.0, 8, "#10a11d"),
      new Point(53.2, 82.1, 0.0, 8, "#cf4055"),
      new Point(75.3, 83.5, 0.0, 8, "#cd4359"),
      new Point(74.1, 105.6, 0.0, 8, "#2855ea"),
      new Point(67.2, 124.8, 0.0, 8, "#ca273c"),
      new Point(45.3, 141.3, 0.0, 8, "#2650e1"), //ㄱ
      new Point(116.1, 20.1, 0.0, 8, "#4a7bf9"),
      new Point(126, 20, 0.0, 8, "#3d65e7"),
      new Point(140, 20, 0.0, 6, "#f47875"),
      new Point(152.3, 21.3, 0.0, 6, "#f36764"),
      new Point(116.8, 33.9, 0.0, 6, "#1d4eeb"),
      new Point(116.5, 48, 0.0, 6, "#698bf1"),
      new Point(116.5, 60.9, 0.0, 6, "#fac652"),
      new Point(126.8, 60.9, 0.0, 6, "#ee5257"),
      new Point(140, 60, 0.0, 6, "#cf2a3f"),
      new Point(150, 60.6, 0.0, 6, "#5681f5"),
      new Point(151.2, 48.7, 0.0, 6, "#4577f6"),
      new Point(150.8, 35.4, 0.0, 6, "#f7b326"), //ㅁ
      new Point(174.1, 54.1, 0.0, 6, "#2b58e8"),
      new Point(189.3, 51.4, 0.0, 6, "#facb5e"),
      new Point(174.4, 28.1, 0.0, 6, "#e02e3d"),
      new Point(190.5, 31.6, 0.0, 6, "#f16d6f"),
      new Point(206.5, 49.5, 0.0, 6, "#507bf2"),
      new Point(205.3, 27.8, 0.0, 6, "#5683f7"),
      new Point(204.6, 5.3, 0.0, 6, "#3158e2"),
      new Point(205.3, 67.8, 0.0, 6, "#f0696c"),
      new Point(204.6, 85.7, 0.0, 6, "#3769f6"),
      new Point(201.9, 107.5, 0.0, 6, "#6084ef"), //ㅕ
      new Point(287, 11.4, 0.0, 6, "#2a5cf4"),
      new Point(275.5, 10.2, 0.0, 6, "#f4716e"),
      new Point(259.9, 9.1, 0.0, 6, "#f8c247"),
      new Point(243.5, 20.1, 0.0, 6, "#e74653"),
      new Point(243.1, 31.2, 0.0, 6, "#ec4147"),
      new Point(243.1, 40.4, 0.0, 5, "#4876f1"),
      new Point(256.8, 38.8, 0.0, 5, "#ef5c5c"),
      new Point(272.8, 37.3, 0.0, 5, "#2552ea"),
      new Point(286.2, 35.4, 0.0, 5, "#4779f7"), //ㄷ
      new Point(299.8, 57.2, 0.0, 5, "#4b78f1"),
      new Point(284.0, 57.7, 0.0, 9, "#ed9d33"),
      new Point(267.4, 57.7, 0.0, 9, "#d44d61"),
      new Point(249.9, 58.5, 0.0, 9, "#4f7af2"),
      new Point(231.1, 59.0, 0.0, 9, "#ef9a1e"), //ㅡ
      new Point(249.0, 78.7, 0.0, 9, "#4976f3"),
      new Point(263.9, 82.6, 0.0, 9, "#269230"),
      new Point(273.1, 87.9, 0.0, 9, "#1f9e2c"),
      new Point(282.3, 93.5, 0.0, 9, "#1c48dd"),
      new Point(274.8, 101.4, 0.0, 9, "#2a56ea"),
      new Point(261.3, 104.5, 0.0, 9, "#3355d8"),
      new Point(246.0, 109.3, 0.0, 9, "#36b641"),
      new Point(242.5, 120.2, 0.0, 9, "#2e5def"),
      new Point(249.9, 129.4, 0.0, 8, "#d53747"),
      new Point(262.6, 132.5, 0.0, 8, "#eb676f"),
      new Point(280.1, 135.1, 0.0, 8, "#f9b125"), //ㄹ
      new Point(368.0, 48.9, 0.0, 8, "#de3646"),
      new Point(87.1, 40.6, 0.0, 8, "#2a59f0"),
      new Point(355.8, 49.8, 0.0, 8, "#eb9c31"),
      new Point(340.9, 50.7, 0.0, 8, "#c41731"),
      new Point(325.2, 51.1, 0.0, 8, "#d82038"),
      new Point(324.3, 67.3, 0.0, 8, "#5f8af8"),
      new Point(323.0, 80.9, 0.0, 8, "#efa11e"),
      new Point(321.2, 95.3, 0.0, 8, "#2e55e2"),
      new Point(337.4, 97.5, 0.0, 8, "#4167e4"),
      new Point(350.5, 98.8, 0.0, 8, "#0b991a"),
      new Point(364.5, 100.5, 0.0, 8, "#4869e3"), //ㄷ
      new Point(389.9, 15.7, 0.0, 8, "#3059e3"),
      new Point(387.3, 40.2, 0.0, 8, "#10a11d"),
      new Point(388.2, 66.9, 0.0, 8, "#cf4055"),
      new Point(392.5, 80.4, 0.0, 8, "#cd4359"),
      new Point(409.6, 79.5, 0.0, 8, "#2855ea"),
      new Point(423.2, 78.7, 0.0, 8, "#ca273c"),
      new Point(386.4, 91.8, 0.0, 6, "#f8c247"),
      new Point(385.5, 108.0, 0.0, 6, "#e74653"),
      new Point(383.2, 132.1, 0.0, 6, "#ec4147"), //ㅏ
    ];

    gLength = g.length;
    for (var i = 0; i < gLength; i++) {
      g[i].curPos.x = canvasWidth / 2 - 180 + g[i].curPos.x;
      g[i].curPos.y = canvasHeight / 2 - 65 + g[i].curPos.y;

      g[i].originalPos.x = canvasWidth / 2 - 180 + g[i].originalPos.x;
      g[i].originalPos.y = canvasHeight / 2 - 65 + g[i].originalPos.y;
    }

    pointCollection = new PointCollection();
    pointCollection.points = g;

    initEventListeners();
    timeout();
  }

  function initEventListeners() {
    $(window).bind("resize", updateCanvasDimensions).bind("mousemove", onMove);

    canvas.get(0).ontouchmove = function (e) {
      e.preventDefault();
      onTouchMove(e);
    };

    canvas.get(0).ontouchstart = function (e) {
      e.preventDefault();
    };
  }

  function updateCanvasDimensions() {
    canvas.attr({ height: $(window).height(), width: $(window).width() });
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();

    draw();
  }

  function onMove(e) {
    if (pointCollection) pointCollection.mousePos.set(e.pageX, e.pageY);
  }

  function onTouchMove(e) {
    if (pointCollection)
      pointCollection.mousePos.set(
        e.targetTouches[0].pageX,
        e.targetTouches[0].pageY
      );
  }

  function timeout() {
    draw();
    update();

    setTimeout(function () {
      timeout();
    }, 30);
  }

  function draw() {
    var tmpCanvas = canvas.get(0);

    if (tmpCanvas.getContext == null) {
      return;
    }

    ctx = tmpCanvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (pointCollection) pointCollection.draw();
  }

  function update() {
    if (pointCollection) pointCollection.update();
  }

  function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.addX = function (x) {
      this.x += x;
    };

    this.addY = function (y) {
      this.y += y;
    };

    this.addZ = function (z) {
      this.z += z;
    };

    this.set = function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    };
  }

  function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.points = new Array();

    this.newPoint = function (x, y, z) {
      var point = new Point(x, y, z);
      this.points.push(point);
      return point;
    };

    this.update = function () {
      var pointsLength = this.points.length;

      for (var i = 0; i < pointsLength; i++) {
        var point = this.points[i];

        if (point == null) continue;

        var dx = this.mousePos.x - point.curPos.x;
        var dy = this.mousePos.y - point.curPos.y;
        var dd = dx * dx + dy * dy;
        var d = Math.sqrt(dd);

        if (d < 150) {
          point.targetPos.x =
            this.mousePos.x < point.curPos.x
              ? point.curPos.x - dx
              : point.curPos.x - dx;
          point.targetPos.y =
            this.mousePos.y < point.curPos.y
              ? point.curPos.y - dy
              : point.curPos.y - dy;
        } else {
          point.targetPos.x = point.originalPos.x;
          point.targetPos.y = point.originalPos.y;
        }

        point.update();
      }
    };

    this.draw = function () {
      var pointsLength = this.points.length;
      for (var i = 0; i < pointsLength; i++) {
        var point = this.points[i];

        if (point == null) continue;

        point.draw();
      }
    };
  }

  function Point(x, y, z, size, colour) {
    this.colour = colour;
    this.curPos = new Vector(x, y, z);
    this.friction = 0.8;
    this.originalPos = new Vector(x, y, z);
    this.radius = size;
    this.size = size;
    this.springStrength = 0.1;
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);

    this.update = function () {
      var dx = this.targetPos.x - this.curPos.x;
      var ax = dx * this.springStrength;
      this.velocity.x += ax;
      this.velocity.x *= this.friction;
      this.curPos.x += this.velocity.x;

      var dy = this.targetPos.y - this.curPos.y;
      var ay = dy * this.springStrength;
      this.velocity.y += ay;
      this.velocity.y *= this.friction;
      this.curPos.y += this.velocity.y;

      var dox = this.originalPos.x - this.curPos.x;
      var doy = this.originalPos.y - this.curPos.y;
      var dd = dox * dox + doy * doy;
      var d = Math.sqrt(dd);

      this.targetPos.z = d / 100 + 1;
      var dz = this.targetPos.z - this.curPos.z;
      var az = dz * this.springStrength;
      this.velocity.z += az;
      this.velocity.z *= this.friction;
      this.curPos.z += this.velocity.z;

      this.radius = this.size * this.curPos.z;
      if (this.radius < 1) this.radius = 1;
    };

    this.draw = function () {
      ctx.fillStyle = this.colour;
      ctx.beginPath();
      ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI * 2, true);
      ctx.fill();
    };
  }

  init();
  setTimeout(go_info, 5000); // 로고 페이지 로딩 4초 후 info로 넘어감.

  function go_info() {
    location.href = "info.html";
  }
});
