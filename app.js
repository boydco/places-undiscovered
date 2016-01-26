
(function () {

    var app = angular.module('quizApp', [])

    app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

      $scope.score = 0
      $scope.activeQuestion = -1
      $scope.activeQuestionAnswered = 0
      $scope.percentage = 0

      $http.get('quiz_data.json').then(function(quizData){
        // $scope.questionBucket = function() {
        //   return quizData.data[Math.floor(Math.random() * quizData.data.length)]
        //
        // }


        $scope.allQuestions = quizData.data

        var questionBucket = $scope.allQuestions
        console.log(questionBucket)

        $scope.myQuestions = _.sampleSize(questionBucket, 10)
        console.log($scope.myQuestions)
        // $scope.myQuestions = function(questionBucket) {
        //   return _.sampleSize(questionBucket, 10)
        // }
        //
        //
        // $scope.myQuestions = quizData.data
        // console.log(_.sample([1, 3, 4]))


        $scope.totalQuestions = $scope.myQuestions.length
      })


      $scope.selectAnswer = function(qIndex, aIndex){

        var questionState = $scope.myQuestions[qIndex].questionState

        if ( questionState != 'answered' ) {
          $scope.myQuestions[qIndex].selectedAnswer = aIndex
          var correctAnswer = $scope.myQuestions[qIndex].correct
          $scope.myQuestions[qIndex].correctAnswer = correctAnswer

          if ( aIndex === correctAnswer ) {
            $scope.myQuestions[qIndex].correctness = 'correct'
            $scope.score += 1
          } else {
            $scope.myQuestions[qIndex].correctness = 'incorrect'
          }
          $scope.myQuestions[qIndex].questionState = 'answered'
        }
        $scope.percentage = ($scope.score / $scope.totalQuestions) * 100
      }

      $scope.isSelected = function(qIndex, aIndex) {
        return $scope.myQuestions[qIndex].selectedAnswer === aIndex
      }
      $scope.isCorrect = function(qIndex, aIndex) {
        return $scope.myQuestions[qIndex].correctAnswer === aIndex
      }

      $scope.selectContinue = function() {
        return $scope.activeQuestion +=1
      }

      $scope.createShareLinks = function(percentage) {

        var url = 'http://colinboyd.me'
        var emailLink = '<a class="btn email" href="mailto:?subject=I know more about American Geography than You!&amp;body=I scored a '+percentage+'% on this quiz about America. Eat Me! Try to beat me at '+url+'">Email a friend</a>'
        var twitterLink = '<a class="btn twitter" btarget="_blank" href="http://twitter.com/share?text=I scored a '+percentage+'% on this american geography quiz, try to beat me at&amp;hastags=AmericanGeography&amp;url='+url+'">Tweet your score</a>'
        var newMarkup = emailLink + twitterLink

        return $sce.trustAsHtml(newMarkup)
      }

    }])
})()




// var app = angular.module('quizApp', []);

// app.directive('quiz', function(quizFactory) {
//   return {
//     restrict: 'AE',
//     scope: {},
//     templateUrl: 'template.html',
//     link: function(scope, elem, attrs) {
//       scope.start = function() {
//         scope.id = 0;
//         scope.quizOver = false;
//         scope.inProgress = true;
//         scope.getQuestion();
//       };

//       scope.reset = function() {
//         scope.inProgress = false;
//         scope.score = 0;
//       }

//       scope.getQuestion = function() {
//         var q = quizFactory.getQuestion(scope.id);
//         if(q) {
//           scope.question = q.question;
//           scope.options = q.options;
//           scope.answer = q.answer;
//           scope.answerMode = true;
//         } else {
//           scope.quizOver = true;
//         }
//       };

//       scope.checkQuestion = function() {
//         if(!$('input[name=answer]:checked').length) return;

//         var ans = $('input[name=answer]:checked').val();

//         if(ans == scope.options[scope.answer]) {
//           scope.score++;
//           scope.correctAns = true;
//         } else {
//           scope.correctAns = false;
//         }

//         scope.answerMode = false;
//       };

//       scope.nextQuestion = function() {
//         scope.id++;
//         scope.getQuestion();
//       }

//       scope.reset();
//     }
//   }
// });

// app.factory('quizFactory', function() {
//   var questions = [
//     {
//        question: "What is your favorite drink on holiday?",
//       options: ["Local Craft Beer", "Regional Wine", "Fancy Cocktails", "Spirits without mixers", "Not a drinker", "Bud Light is Fine"],
//       answer: 2
//     },
//     {
//        question: "What is your favorite outdoor activity?",
//       options: ["Hiking", "Swimming", "Walking around a city", "Go to a Sporting Event", "Picnic in a park", "staying inside"],
//       answer: 0
//     },
//     {
//       question: "Which was the first country to issue paper currency?",
//       options: ["USA", "France", "Italy", "China"],
//       answer: 3
//     },
//     {
//       question: "Which city hosted the 1996 Summer Olympics?",
//       options: ["Atlanta", "Sydney", "Athens", "Beijing"],
//       answer: 0
//     },
//     {
//       question: "Who invented telephone?",
//       options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
//       answer: 1
//     }
//   ];

//   return {
//     getQuestion: function(id) {
//       if(id < questions.length) {
//         return questions[id];
//       } else {
//         return false;
//       }
//     }
//   };
// });
