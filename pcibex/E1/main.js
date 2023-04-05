PennController.ResetPrefix()
DebugOff()
var showProgressBar = false;

PennController.Sequence("intro", "counter", randomize("experiment"), randomize("fill"), SendResults(), "bye")

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

Template("template.csv", row => 
  newTrial("experiment",
    newImage('screen' , 'screen.jpg' )
        .size(620, 540)
    ,
    newImage('kid' , 'kid.jpg' )
        .size(200, 400)
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
        .add( 30, 165, getImage('kid'), 2 )
        .center()
        .print()
    ,
    newButton("click", "Click me!")
        .center()
        .print()
        .wait()
  )
  .log("group", row.group)
  .log("condition", row.condition)
  .log("item", row.item)
)

Template(
  GetTable("template.csv")
    .filter( row => row.type == "Critical" )
  , row => newTrial("fill",
      newImage("stimuli", row.image)
          .cssContainer({
              "height" : 350,
              "width" : 480
          })
          .center()
          .print()
      ,
      newButton("click", "Click me!")
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
          <p>We had Bobby use words that vary in this kind of specificity to describe objects in his pictures. You may have found it odd (but not wrong) when bobby called something an animal or furniture when he could have been more specific - this is the intuitition that this study tried to probe.</p>
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