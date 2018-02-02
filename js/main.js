$(document).ready(function(){
  var experience = $('.experience'),
      CurrentIndex = 0;

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

      timelineAttributes['navigations'].on('click', '.next', function(event){
        event.preventDefault();

        updateLineBar(getCurrentIndex('next', timelineAttributes['events']), timelineAttributes);
      });

      timelineAttributes['navigations'].on('click', '.prev', function(event){
        event.preventDefault();

        updateLineBar(getCurrentIndex('prev', timelineAttributes['events']), timelineAttributes);
      });

      // timelineAttributes['timeline'].on('swipeleft', function(){
      //   updateLineBar(getCurrentIndex('next', timelineAttributes['events']), timelineAttributes);
      // })
      //
      // timelineAttributes['timeline'].on('swiperight', function(){
      //   updateLineBar(getCurrentIndex('prev', timelineAttributes['events']), timelineAttributes);
      // })

      timelineAttributes['eventWrapper'].on('click', 'a', function(event){
        event.preventDefault();
        var $that = $(this);

        updateLineBar($that, timelineAttributes);
      });

    });
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
    var offset = timelineAttributes['eventWrapper'].offset().left,
        position = selectedEvent.offset().left,
        width = selectedEvent.width() / 2,
        TotalWidth = position + width - offset;

    timelineAttributes['events'].removeClass();

    timelineAttributes['events'].each(function(i){
      if((selectedEvent.text() != $(this).text()))
        $(this).addClass('highlighted');
      else {
        CurrentIndex = i;
        updateCount(i, timelineAttributes);
        return false;
      }
    });

    selectedEvent.addClass('active');

    timelineAttributes['lineBar'].css('width', TotalWidth);
  }

  var getCurrentIndex = function(direction, elements){
    var arrayLength = elements.length - 1,
        $position = 0;
    if(direction == 'next'){
      $position = (arrayLength < (CurrentIndex + 1) ? 0 : CurrentIndex + 1)
      CurrentIndex++;
    } else if(direction == 'prev'){
      $position = (0 <= (CurrentIndex - 1) ? CurrentIndex - 1 : arrayLength);
      CurrentIndex--;
    }
    return elements.eq($position);
  }

  main(experience);
});
