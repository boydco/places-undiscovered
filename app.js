var app = angular.module('quizApp', [])

app.directive('quiz', function() {
  return {
    restrict: 'AE',
    scope: {},
    templateUrl: 'template.html',
    link: function(scope, elem, attr){
      scope.start = function () {
        scope.id = 0
        scope.quizOver = false
        scope.inProgress = true
        scope.getQuestion()
      }

      scope.reset = function() {
        scope.inProgress = false
        scope.score = 0
      }

      scope.getQuestion = function() {
        var q = quizFactory.getQuestion(scope.id)
        if(q) {
          scope.question = q.question
          scope.options = q.options
          scope.answer = q.answer
          scope.answerMode = true
        } else {
          scope.quizOver = true
        }
      }
      scope.checkAnswer = function() {
        if (!$('input[name=answer]:checked').length) return

        var ans = $('input[name=answer]:checked').val()

        if(ans == scope.options[scope.answer]) {
          scope.score++
          scope.correctAns = true
        } else {
          scope.correctAns = false
        }

        scope.answerMode = false
      }

      scope.nextQuestion = function() {
        scope.id++
        scope.getQuestion()
      }
      scope.reset()
    }
  }
})

app.factory('quizFactory', function() {
  var questions = [
    {
      question: "What is your favorite drink on holiday?",
      options: ["Local Craft Beer", "Regional Wine", "Fancy Cocktails", "Spirits without mixers", "Not a drinker", "Bud Light is Fine"],
      answer: 2
    },
    {
      question: "What is your favorite outdoor activity?",
      options: ["Hiking", "Swimming", "Walking around a city", "Go to a Sporting Event", "Picnic in a park", "staying inside"],
      answer: 0
    },
    {
      question: "Which was the first country to issue paper currency?",
      options: ["USA", "France", "Italy", "China"],
      answer: 0
    },
    {
      question: "Which city hosted the 1996 Summer Olympics?",
      options: ["Atlanta", "Sydney", "Athens", "Beijing"],
      answer: 3
    },
    {
      question: "Who invented telephone?",
      options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
      answer: 3
    }
  ]

  return {
    getQuestion: function(id) {
      if(id < questions.length) {
        return questions[id]
      } else {
        return false
      }
    }
  }
})
