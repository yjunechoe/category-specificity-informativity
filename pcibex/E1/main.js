PennController.ResetPrefix()
DebugOff()
var showProgressBar = false;

PennController.Sequence("intro", "instructions", "counter", randomize("critical"), randomize("filler-bad"), randomize("filler-good"), randomize("fill"), SendResults(), "bye")

SetCounter("counter", "inc", 1);

newTrial( "intro" ,
    newText("<p style=font-size:18px;>Welcome to our study!</p>" +
            "<p style=font-size:18px;>Press Enter to go full screen and begin!:</p>")
        .center()
        .print()
    ,
    newKey("Enter","ENTER")
        .wait()
    ,
    fullscreen()
)

newTrial("instructions",
  newImage("kid", "kid.png")
    .css({
	"width": "300px"
    })
    .cssContainer({
      "margin-top": "20vh"
    })
    .center()
    .print()
  ,
  newText("Inst", "This is Suzy. Suzy is a student in elementary school.<br>Over the past summer break, Suzy took pictures of many things around her for a class show-and-tell project, which she will have to present next week.<br>Suzy wants to practice before presenting and would like your help!")
    .cssContainer({
      "width": "1000px",
      "transform": "translateX(-150px)",
      "margin-top": "1em",
      "margin-bottom": "1em"
    })
    .css({
      "font-size": "28px",
      "font-style": "italic",
    })
    .print()
  ,
  newButton("Continue")
    .cssContainer({
      "margin-top": "2em"
    })
    .css({
      "font-size": "24px",
    })
    .center()
    .print()
    .wait()
    .remove()
  ,
  getText("Inst")
    .text(`Hi I'm Suzy! Can you help me practice my show and tell project for next week?`)
    .css({
      "font-size": "28px",
      "font-style": "plain",
    })
  ,
  newButton("Yes")
    .cssContainer({
      "margin-top": "2em"
    })
    .css({
      "font-size": "24px",
    })
    .center()
    .print()
    .wait()
    .remove()
  ,
  getText("Inst")
    .text(`Suzy will be presenting a slideshow of pictures<br>Please give Suzy feedback on how well she described what is in each picture using a set of reactions.<br>Click "thumbs up" for "good", "thumbs down" for "bad" and "thumbs sideways" for somewhere in between.`)
    .css({
      "font-size": "28px",
      "font-style": "italic",
    })
  ,
  newButton("Begin")
    .cssContainer({
      "margin-top": "2em"
    })
    .css({
      "font-size": "24px",
    })
    .center()
    .print()
    .wait()
    .remove()
)

function expTemplate(label) {
  return row => newTrial(label,
    newImage('screen' , 'screen.jpg' )
        .size(620, 540)
    ,
    newImage('kid' , 'kid.png' )
	  .css({
	    "width": "200px"
    	  })
    ,
    newImage("stimuli", row.image)
        .cssContainer({
            "height" : 350,
            "width" : 480
        })
        .css({
            "margin-left": "auto",
            "margin-right": "auto"
        })
    ,
    newCanvas( 'myCanvas', 950, 600)
        .add( 300, 30, getImage('screen'), 0 )
        .add( 370, 110, getImage('stimuli'), 1)
        .add( 0, 270, getImage('kid'), 2 )
        .center()
        .print()
    ,
    newText("Speech", row.text)
        .center()
        .css({
          "font-size": "28px",
          "width" : "1000px"
        })
        .print()
    ,
    newImage("thumbsup", "thumb.jpg")
        .print()
    ,
    newImage("thumbsside", "thumb.jpg")
        .css({
          "transform": "rotate(270deg)"
        })
        .print()
    ,
    newImage("thumbsdown", "thumb.jpg")
        .css({
          "transform": "rotate(180deg)"
        })
        .print()
    ,
    newCanvas("all-thumbs", 1000, 200)
        .add( 0, 40, getImage("thumbsdown"), 0 )
        .add( 420, 0, getImage("thumbsside"), 1 )
        .add( 840, 0, getImage("thumbsup"), 2 )
        .css({
          "scale": "0.7"
        })
        .center()
        .print()
    ,
    newSelector("judgment")
      .add( getImage("thumbsdown") , getImage("thumbsside"), getImage("thumbsup") )
      .wait()
      .log()
  )
  .log("group", row.group)
  .log("condition", row.condition)
  .log("item", row.item)
}

Template(
  GetTable("template.csv")
    .filter( row => row.type == "Critical" ),
  expTemplate("critical")
)
Template(
  GetTable("template.csv")
    .filter( row => row.type == "Filler-bad" ),
  expTemplate("filler-bad")
)
Template(
  GetTable("template.csv")
    .filter( row => row.type == "Filler-good" ),
  expTemplate("filler-good")
)

Template(
  GetTable("template.csv")
    .filter( row => row.type == "Critical" )
  , row => newTrial("fill",
      newImage("stimuli", row.image)
          .cssContainer({
              "margin-top": "4em",
              "height" : 350,
              "width" : 480
          })
          .css({
            "margin-left": "auto",
            "margin-right": "auto"
          })
          .center()
          .print()
      ,
      newText("This is one of the pictures that Suzy showed.<br>What should Suzy say to describe what's in the picture?")
          .css({"margin": "2em"})
          .center()
          .print()
      ,
      newTextInput("response")
        .center()
        .lines(1)
        .size(400, 50)
        .print()
        .log()
      ,
      newButton("Continue")
          .cssContainer({
            "margin-top": "2em"
          })
          .css({
            "font-size": "24px",
          })
          .center()
          .print()
          .wait()
    )
    .log("group", row.group)
    .log("condition", row.condition)
    .log("item", row.item)
  )

  newTrial( "bye" ,
      newText("<p style=font-size:18px;>Your results have been saved, but you need to validate your participation below.</p>" +
              "<p style=font-size:18px;><a href=''>Click here to confirm my submission</a>.</p>")
          .center()
          .print()
      ,
      newText( "debrief" , `<div>
          <h1>Debriefing</h1>
          <p>In this experiment, we were looking at the kinds of words people use to describe everyday objects. If you see a dog, you can either be very specific and call it a dalmatian, or be very broad and call it a dog.</p>
          <p>We had Suzy use words that vary in this kind of specificity to describe objects in his pictures. You may have found it odd (but not wrong) when Suzy called something an animal or furniture when he could have been more specific - this is the intuitition that this study tried to probe.</p>
      </div>`)
          .css({
            "width": "800px",
            "margin-top": "20px",
            "border-top": "2px solid black"
          })
          .center()
          .print()
      ,
      newButton("empty")
          .print()
          .hidden()
          .wait()
)