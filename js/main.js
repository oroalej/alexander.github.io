$(document).ready(function(){
  var experience = $('.experience'),
      minEventDistance = 200;

  var main = function(experience){
    experience.each(function(){
      var timeline = $(this),
          timelineAttributes = {};
      timelineAttributes['timeline'] = timeline.find('.timeline');
      timelineAttributes['eventWrapper'] = timelineAttributes['timeline'].children('.events-wrapper');
      timelineAttributes['lineBar'] = timelineAttributes['eventWrapper'].find('.filter');
      timelineAttributes['events'] = timelineAttributes['eventWrapper'].find('a');
      timelineAttributes['navigations'] = timeline.children('.navigation');
      timelineAttributes['content'] = timeline.children('.content');

      setDatePosition(timelineAttributes);



      timelineAttributes['navigations'].on('click', '#next', function(event){
        event.preventDefault();
        updateSlide(timelineAttributes);
      });

      timelineAttributes['navigations'].on('click', '#prev', function(event){
        event.preventDefault();
        updateSlide(timelineAttributes);
      });

      timelineAttributes['eventWrapper'].on('click', 'a', function(event){
        event.preventDefault();

        var $that = $(this);
        timelineAttributes['events'].removeClass();

        timelineAttributes['events'].each(function(){
          if(($that.text() != $(this).text()))
            $(this).addClass('highlighted');
          else {
            return false;
          }
        });

        $that.addClass('active');

        updateLineBar($that, timelineAttributes);
      });
    });
  }

  var setDatePosition = function(timelineAttributes){
    var wrapperWidth = timelineAttributes['eventWrapper'].width(),
        min = wrapperWidth/2;
    for (i = 0; i < timelineAttributes['events'].length; i++){
      // if(wrapperWidth > 223)
      // timelineAttributes['events'].eq(i).css('left', min+"px");
    }

  }

  var updateSlide = function(timelineAttributes){

          // console.log(timelineAttributes['timeline'].find('.active'));
    // .each(function(){
    //   console.log($(this))
    //   $(this).next().addClass('active');
    // });
  }

  var updateLineBar = function(selectedEvent, timelineAttributes){
    var zz = timelineAttributes['eventWrapper'].offset();
    var offset = timelineAttributes['eventWrapper'].offset().left,
        position = selectedEvent.offset().left,
        width = selectedEvent.width() / 2,
        TotalWidth = position + width - offset;
    timelineAttributes['lineBar'].css('width', TotalWidth);


  }

  main(experience);

});
