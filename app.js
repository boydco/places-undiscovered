$(function () {
  var source = $("#questionMaster").html()

  var template = Handlebars.compile(source)
  // template({pete: "is awesome"})

  var context = {
    questionNumber: "Question 1",
    questionText: "Favorite holiday drink?",
    answers: [{
      answer: "beer"
    },
    {
      answer: "wine"
    }
  ]

  }

  var html = template(context)

  $(document.body).html(html)
})
