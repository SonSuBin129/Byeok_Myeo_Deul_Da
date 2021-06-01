window.onload = function () {
  var checkcheck = 1; //히든스테이지가 clear상태임을 알 수 있게 해주는 변수(clear일때 chekcheck==0)
  var video = document.getElementById("video");
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  video.style.display = "none";
  var x = canvas.width / 2;
  var y = canvas.height - 400; // 공 시작 위치의 y좌표가 패들의 바로 위에 위치하도록 설정함.
  var dx = 10;
  var dy = -10;
  var ballRadius = 10; //공의 반지름
  var paddleRadius = 50; //패들의 반지름
  var paddleCenterX; // 원 패들 중점의 x좌표
  var paddleCenterY; //원 패들 중점의 y좌표
  var paddleAreaWidth = 250; //원 패들이 움직일 수 있는 범위의 너비
  var paddleAreaHeight = 250; //원 패들이 움직일 수 있는 범위의 높이
  var areaMinX = 360 - 125;
  var areaMaxX = 360 + 125;
  var areaMinY = 340 - 125;
  var areaMaxY = 340 + 125;
  var brickWidth = 40;
  var brickHeight = 30;
  var brickPadding = 2;
  var brickOffsetTop = 40;
  var d_brick = 0.1; //벽돌 크기 변화량
  var Max_d_brick = 10;

  var score = 0;
  var goal_score = parseInt(Math.random() * 20 + 1) + 30;
  var time = 60; //제한 시간
  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;
  var ball_img = new Image();
  ball_img.src =
    "https://cdn.pixabay.com/photo/2016/03/31/18/31/bean-1294427_960_720.png";
  var paddle_img = new Image();
  paddle_img.src = "https://i.ytimg.com/vi/YSD6HyGbiQI/maxresdefault.jpg";
  var special_brick = new Image();
  special_brick.src =
    "https://i.pinimg.com/474x/5d/fd/75/5dfd7562734a524ebcb68e2fc4b7edcc.jpg";

  var sound_effect = new Audio(
    "static/" + sessionStorage.getItem("1") + ".mp3"
  ); //환경설정에서 선택한 효과음 객체 생성 및 불러오기
  var background_sound = new Audio(
    "static/" + sessionStorage.getItem("0") + ".mp3"
  ); //환경설정에서 선택한 배경음악 객체 생성 및 불러오기
  background_sound.loop = true;

  var bricks_h = new Array(16);
  for (var c = 0; c < bricks_h.length; c++) {
    bricks_h[c] = { x: 0, y: 0, status: 1, score: 0 };
    if (c < 5) {
      bricks_h[c].score = 1;
    } else if (5 <= c && c < 9) {
      bricks_h[c].score = 3;
    } else if (9 <= c && c < 11) {
      bricks_h[c].score = 5;
    } else if (11 <= c && c < 15) {
      bricks_h[c].score = -2;
    }
  }

  function paddle_area() {
    ctx.beginPath();
    ctx.rect(areaMinX, areaMinY, paddleAreaWidth, paddleAreaHeight);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  function change_Bricks() {
    brickHeight = brickHeight + d_brick;
    brickWidth = brickWidth + d_brick;
  }

  function check(bx, by, c) {
    //블럭 위치 check하는 함수
    if (
      bx > 235 - brickWidth - brickPadding - Max_d_brick &&
      bx < 485 &&
      by > 215 - brickHeight - brickPadding - Max_d_brick &&
      by < 465
    ) {
      return false;
    } else {
      for (var r = c; r >= 0; r--) {
        if (
          //padding있어서 부등호에 "="이 들어감, 확인해보고 다시 결정
          bx + brickWidth + Max_d_brick < bricks_h[r].x - brickPadding ||
          bx - brickPadding > bricks_h[r].x + brickWidth + Max_d_brick ||
          by + brickHeight + Max_d_brick < bricks_h[r].y - brickPadding ||
          by - brickPadding > bricks_h[r].y + brickHeight + Max_d_brick
        ) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }
  }

  function pointBricks() {
    for (var c = 0; c < bricks_h.length; c++) {
      bricks_h[c].status = 1; //블럭들 상태 초기화
      var brickX =
        Math.random() *
          (canvas.width - brickWidth - brickPadding - Max_d_brick) +
        brickPadding;
      var brickY =
        Math.random() *
          (canvas.height -
            brickHeight -
            brickPadding -
            brickOffsetTop -
            Max_d_brick) +
        brickPadding +
        brickOffsetTop;
      if (check(brickX, brickY, c)) {
        bricks_h[c].x = brickX;
        bricks_h[c].y = brickY;
      } else {
        c--;
        continue;
      }
    }
    setInterval(pointBricks, 5000);
  }

  // 블럭 화면에 그려줌
  function drawBricks_h() {
    //블럭 => pointBricks에서 정해진 좌표로 블럭그리기
    //status가 1인 블럭 그리기
    for (var i = 0; i < bricks_h.length; i++) {
      if (bricks_h[i].status === 1 && bricks_h[i].score === 1) {
        ctx.beginPath();
        ctx.rect(bricks_h[i].x, bricks_h[i].y, brickWidth, brickHeight);
        ctx.closePath();
        ctx.fillStyle = "#B9BFFF";
      } else if (bricks_h[i].status === 1 && bricks_h[i].score === 3) {
        ctx.beginPath();
        ctx.rect(bricks_h[i].x, bricks_h[i].y, brickWidth, brickHeight);
        ctx.closePath();
        ctx.fillStyle = "#5B68FF";
      } else if (bricks_h[i].status === 1 && bricks_h[i].score === 5) {
        ctx.beginPath();
        ctx.rect(bricks_h[i].x, bricks_h[i].y, brickWidth, brickHeight);
        ctx.closePath();
        ctx.fillStyle = "#0000FF";
      } else if (bricks_h[i].status === 1 && bricks_h[i].score === -2) {
        ctx.beginPath();
        ctx.rect(bricks_h[i].x, bricks_h[i].y, brickWidth, brickHeight);
        ctx.closePath();
        ctx.fillStyle = "#FF5B59";
      } else if (bricks_h[i].status === 1 && bricks_h[i].score === 0) {
        ctx.drawImage(
          //item 블록 그려주기
          special_brick,
          bricks_h[i].x,
          bricks_h[i].y,
          brickWidth,
          brickHeight
        );
      }
      ctx.fill();
    }
  }

  //정사각형 패들의 시작 좌표를 설정
  paddleCenterX = canvas.width / 2; //정사각형 패들의 시작 x좌표 설정하기
  paddleCenterY = canvas.height / 2; //정사각형 패들의 시작 y좌표 설정하기

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler);

  //키보드 컨트롤 (상,하,좌,우)
  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    } else if (e.keyCode == 38) {
      upPressed = true;
    } else if (e.keyCode == 40) {
      downPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    } else if (e.keyCode == 38) {
      upPressed = false;
    } else if (e.keyCode == 40) {
      downPressed = false;
    }
  }

  //마우스 컨트롤 (상,하,좌,우)
  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if (
      //마우스의 위치가 패들범위안에 있도록 하는 마우스 이벤트!
      relativeX > canvas.width / 2 - paddleAreaWidth / 2 &&
      relativeX < canvas.width / 2 + paddleAreaWidth / 2 &&
      relativeY < canvas.height / 2 + paddleAreaHeight / 2 &&
      relativeY > canvas.height / 2 - paddleAreaHeight / 2
    ) {
      paddleCenterX = relativeX;
      paddleCenterY = relativeY;
    }
  }

  function drawPaddle_h() {
    ctx.beginPath();
    ctx.arc(paddleCenterX, paddleCenterY, paddleRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.drawImage(
      paddle_img,
      500,
      110,
      750,
      360,
      paddleCenterX - 60,
      paddleCenterY - 50,
      120,
      100
    );
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.closePath();
    // ctx.drawImage(bean_image, x, y, 10, 10);
    ctx.fillStyle = "#59411b";
    ctx.fill();
    ctx.drawImage(ball_img, x - 15, y - 15, 30, 30);
  }

  function draw() {
    //위치 바뀌기 전 공 삭제
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks_h();
    drawPaddle_h();
    change_Bricks();
    drawScore();
    paddle_area();
    Timer();
    checkcheck = collisionDetection();
    if (checkcheck === 0 || time <= 0) {
      return 0;
    }

    // 공이 화면의 상하좌우 4개의 면에 모두 튕기도록 함.
    if (x > canvas.width - ballRadius || x < ballRadius) {
      dx = -dx; // 공이 좌우벽에 튕기도록 하기
    }
    if (y > canvas.height - ballRadius || y < ballRadius) {
      dy = -dy; //공이 상하벽에서 튕기도록 하기
    }

    // 두 원의 충돌감지
    var distanceX = Math.pow(paddleCenterX - x, 2);
    var distanceY = Math.pow(paddleCenterY - y, 2);
    var between = paddleRadius + ballRadius; //두 원의 반지름 길이의 합
    var point_between = Math.sqrt(distanceX + distanceY); //두 원의 중심 사이의 거리

    if (between >= point_between) {
      dx = -dx;
      dy = -dy;
    }

    if (rightPressed && paddleCenterX < areaMaxX - paddleRadius) {
      paddleCenterX += 7;
    } else if (leftPressed && paddleCenterX > areaMinX + paddleRadius) {
      paddleCenterX -= 7;
    } else if (upPressed && paddleCenterY > areaMinY + paddleRadius) {
      paddleCenterY -= 7;
    } else if (downPressed && paddleCenterY < areaMaxY - paddleRadius) {
      paddleCenterY += 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
  }

  Alert();
  setTimeout(init, 2500); //히든스테이지 입장 화면

  function init() {
    background_sound.volume = 0.3;
    background_sound.play();
    pointBricks();
    draw();

    var t = setInterval(function () {
      // alert(brickHeight - 30);
      d_brick = -d_brick;
      if (d_brick > Max_d_brick) {
        clearInterval(t);
      }
    }, 1250);

    var set_t = setInterval(function () {
      time--;
      if (time <= 0) {
        clearInterval(set_t);
        failAlert();
        background_sound.pause(); //배경음악 재생을 멈춤
        x = 0;
        y = 0; // 공을 멈춤
        // alert("시간오버");
        setTimeout(go_info, 5000);
      } else if (checkcheck === 0) {
        clearInterval(set_t);
        clearAlert();
        video.style.display = "block";
        canvas.style.display = "none";
        background_sound.pause();
        x = 0;
        y = 0;
        setTimeout(play_video, 5000);
      }
    }, 1000);
  }

  function play_video() {
    video.play();
    video.onended = go_info;
  }

  function go_info() {
    location.href = "info.html";
  }

  // 블럭에 충돌 감지 함수
  // 공이 벽돌안에 존재하려면?
  // 공의 x,y좌표는 벽돌의 x,y좌표보다 커야한다.
  // 공의 x,y좌표는 벽돌의 x,y좌표 + 가로길이, 세로길이 보다 작아야한다.
  function collisionDetection() {
    for (var c = 0; c < bricks_h.length; c++) {
      var b = bricks_h[c];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          sound_effect.volume = 1;
          sound_effect.play();
          if (b.score === 0) {
            //아이템 벽돌일때
            var check = parseInt(Math.random() * 2);
            if (check === 1) {
              if (background_sound.volume != 0) {
                background_sound.volume -= 0.1;
                effectAlert1();
              } else {
                blankAlert();
              }
            } else {
              dx = (dx / 3) * 2;
              dy = (dy / 3) * 2;
              effectAlert2();
            }
          }
          score += b.score;
          if (score === goal_score) {
            // alert 말고 화면에 보이게끔 하기
            return 0;
            //document.location.reload();
          }
        }
      }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Goal: " + goal_score + "  Recent Score: " + score, 205, 20);
  }

  function Timer() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Time: " + time, canvas.width / 2 + 75, 20);
  }

  function Alert() {
    let timerInterval;
    Swal.fire({
      title: "히든 스테이지 입장!",
      html: "<b></b> 뒤에 시작",
      timer: 2500,
      timerProgressBar: true,
      backdrop: `
                  rgba(0,0,0,1)
                  url("https://media1.tenor.com/images/bc92a54fd52558c950378140d66059e3/tenor.gif")
                  center
                  no-repeat
                `,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }

  function clearAlert() {
    Swal.fire({
      title: "미션 성공!",
      width: 250,
      timer: 5000,
      backdrop: `
                  rgba(0,0,0,1)
                  url("http://file3.instiz.net/data/cached_img/upload/2021/03/18/13/369551b95ce1b5bb14bd1266078a6087_mp4.gif")
                  center
                  no-repeat
                `,
      showConfirmButton: false,
    });
  }

  function failAlert() {
    Swal.fire({
      title: "타임 오버!",
      width: 250,
      timer: 5000,
      backdrop: `
                  rgba(0,0,0,1)
                  url("https://thumbs.gfycat.com/ConfusedRedBorer-size_restricted.gif")
                  center
                  no-repeat
                `,
      showConfirmButton: false,
    });
  }

  function effectAlert1() {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "배경음악 소리가 줄어듭니다.",
      showConfirmButton: false,
      timer: 800,
    });
  }
  function effectAlert2() {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "공의 속도가 느려집니다.",
      showConfirmButton: false,
      timer: 800,
    });
  }

  function blankAlert() {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "꽝!",
      showConfirmButton: false,
      timer: 800,
    });
  }
};
