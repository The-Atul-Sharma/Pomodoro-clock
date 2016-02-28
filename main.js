var app = angular.module('myApp',[]);

app.controller('mainCtrl', function($scope, $interval){

  $scope.break = 5;
  $scope.session = 25;

  $scope.timer = $scope.session;
  $scope.status = "Session";
  $scope.pausebutton = " Start";
  $scope.current;
  var click = false;
  var seconds = $scope.timer * 60;
  $scope.initialTime = $scope.session;


  function convertSeconds(time){
    time = Number(time);
    var minutes = Math.floor(time % 3600 / 60);
    var secs = (time % 3600 % 60);
    return ( (minutes < 10 ? "0" : "")  + minutes + ":" + (secs < 10 ? "0" : "") + secs
          );
  };


  $scope.sessionLength = function(t){
    if (!click){
      if($scope.status === 'Session'){
        $scope.session += t;
      if ($scope.session <= 1){
        $scope.session = 1;
      }
      $scope.timer = $scope.session;
      $scope.initialTime = $scope.session;
      seconds = $scope.session * 60;
     }
    }
  }

  
  $scope.breakLength = function(t){
    if(!click){
        $scope.break += t;
        if($scope.break <= 1){
          $scope.break = 1;
        };
      if($scope.status === 'Break'){
        $scope.timer = $scope.break;
        $scope.initialTime = $scope.break;
        seconds = $scope.break * 60;
     };
    };
  };


  $scope.startTimer = function (){
    if (!click) {
      if ($scope.status === 'Session'){
        $scope.current = $scope.session;
        $scope.timer = $scope.session;
        $scope.pausebutton = " Pause";
        $( "#pausebtn > i" ).removeClass( "fa fa-play" ).addClass( "fa fa-pause" );
      } else {
        $scope.current = $scope.break;
        $scope.timer = $scope.break;
      }
      
      updateTime();
      click = $interval(updateTime, 1000);
      if (!click) {
        $scope.pausebutton = " Start";
        $( "#pausebtn > i" ).removeClass( "fa fa-pause" ).addClass( "fa fa-play" );
      }else{
        $scope.pausebutton = " Pause";
        $( "#pausebtn > i" ).removeClass( "fa fa-play" ).addClass( "fa fa-pause" );
      }
    } else {
      $interval.cancel(click);
      click = false;
      $scope.pausebutton = " Start";
      $( "#pausebtn > i" ).removeClass( "fa fa-pause" ).addClass( "fa fa-play" );
    }
  }


  function updateTime(){
    seconds -= 1;
    if (seconds === 0){
      if ($scope.status === 'Break') {
        $scope.status = 'Session';
        $scope.current = $scope.session;
        $scope.timer = $scope.session * 60;
        $scope.initialTime = $scope.session;
        seconds = $scope.session * 60;
        var audio = new Audio('http://www.freesfx.co.uk/rx2/mp3s/7/8478_1353333022.mp3');
        audio.play();
      } else {
        $scope.status = 'Break';
        $scope.current = $scope.break;
        $scope.timer = $scope.break * 60;
        $scope.initialTime = $scope.break;
        seconds = $scope.break * 60;
        var audio = new Audio('http://www.freesfx.co.uk/rx2/mp3s/7/8478_1353333022.mp3');
        audio.play();
      }
    }else {
      $scope.timer = convertSeconds(seconds);
    }
  }
   
  $scope.reset = function(){
    $interval.cancel(click);
    click = false; 
    $scope.session = 25;
    $scope.break = 5;
    $scope.timer = 0;
    $scope.pausebutton = " Start";
    $( "#pausebtn > i" ).removeClass( "fa fa-pause" ).addClass( "fa fa-play" );
    $scope.status = 'Session';
    $scope.current = $scope.session;
    $scope.timer = $scope.session;
    seconds = $scope.timer * 60;
    
  };

});
