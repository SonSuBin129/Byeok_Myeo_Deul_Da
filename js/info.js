var ex_bc_audio = new Audio(); //이전에 틀어져 있던 오디오를 저장할 변수
var ex_ef_audio = new Audio();

$(document).ready(function () {
  $("#bc").click(bc_popup_show);
  $("#ef").click(ef_popup_show);
  $("#im").click(im_popup_show);

  $(".close_im img").on("click", close_set_box);

  $("input[name=back_sound]:radio").change(function () {
    ex_bc_audio.pause();
    var bc_check = this.value;
    ex_bc_audio = play_backsound(bc_check);
  });

  $("input[name=effect_sound]:radio").change(function () {
    ex_ef_audio.pause();
    var ef_check = this.value;
    ex_ef_audio = play_effectsound(ef_check);
  });
});

function bc_popup_show() {
  $("#set_bc").addClass("popup");
  change_position($(".popup"));
  $("#set_bc").css("display", "block");
}

function ef_popup_show() {
  $("#set_ef").addClass("popup");
  change_position($(".popup"));
  $("#set_ef").css("display", "block");
}

function im_popup_show() {
  $("#set_im").addClass("popup");
  change_position($(".popup"));
  $("#set_im").css("display", "block");
}

function change_position(obj) {
  var i = ($(window).width() - obj.width()) / 2;
  var t = ($(window).height() - obj.height()) / 2;
  obj.css({ top: t, left: i });
}

function close_set_box() {
  $("#set_bc").hide();
  $("#set_ef").hide();
  $("#set_im").hide();
  ex_bc_audio.pause(); //설정 팝업 창 끄면 오디오들도 다 꺼지게
  ex_ef_audio.pause();
}

function play_backsound(b) {
  var x = 0;
  if (b == "backgroundsound1") {
    x = "1";
  } else if (b == "backgroundsound2") {
    x = "2";
  } else if (b == "backgroundsound3") {
    x = "3";
  } else if (b == "backgroundsound4") {
    x = "4";
  } else {
    x = "5";
  }
  var s_audio = "static/backgroundsound" + x + ".mp3";
  var audio = new Audio(s_audio);
  audio.play();
  return audio;
}

function play_effectsound(b) {
  var x = 0;
  if (b == "soundeffect1") {
    x = "1";
  } else if (b == "soundeffect2") {
    x = "2";
  } else {
    x = "3";
  }
  var s_audio = "static/soundeffect" + x + ".mp3";
  var audio = new Audio(s_audio);
  audio.play();
  return audio;
}

function storeData() {
  var backSound = $("input:radio[name=back_sound]:checked").val();
  var effectSound = $("input:radio[name=effect_sound]:checked").val();
  var backImage = $("input:radio[name=back_image]:checked").val();

  sessionStorage.setItem("0", backSound);
  sessionStorage.setItem("1", effectSound);
  sessionStorage.setItem("2", backImage);
  close_set_box();
}

function start_game() {
  storeData();
  location.href = "index.html";
}
