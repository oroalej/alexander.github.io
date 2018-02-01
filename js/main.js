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
      timelineAttributes['navigations'] = timelineAttributes['timeline'].children('.navigation');
      timelineAttributes['content'] = timelineAttributes['timeline'].find('.item');

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


        updateLineBar($that, timelineAttributes);
      });
    });
  }

  // Set Date position spaces
  var setDatePosition = function(timelineAttributes){
    var wrapperWidth = timelineAttributes['eventWrapper'].width(),
        min = wrapperWidth/2;
    for (i = 0; i < timelineAttributes['events'].length; i++){
      // if(wrapperWidth > 223)
      // timelineAttributes['events'].eq(i).css('left', min+"px");
    }

  }

  // Update Counter

  var updateCount = function(index, element){
    element['navigations'].find('#count').text(index + 1 + "/4");
    updateContent(index, element);
  }

  // For Mobile devices
  var updateSlide = function(index, timelineAttributes){

  }

  // Update content
  var updateContent = function(index, timelineAttributes){
    timelineAttributes['content'].removeClass('active');
    timelineAttributes['content'].eq(index).addClass('active');
  }

  var updateLineBar = function(selectedEvent, timelineAttributes){
    var zz = timelineAttributes['eventWrapper'].offset();
    var offset = timelineAttributes['eventWrapper'].offset().left,
        position = selectedEvent.offset().left,
        width = selectedEvent.width() / 2,
        TotalWidth = position + width - offset;

    timelineAttributes['events'].removeClass();

    timelineAttributes['events'].each(function(i){
      if((selectedEvent.text() != $(this).text()))
        $(this).addClass('highlighted');
      else {
        updateCount(i, timelineAttributes);
        return false;
      }
    });

    selectedEvent.addClass('active');

    timelineAttributes['lineBar'].css('width', TotalWidth);
  }

  main(experience);
});
