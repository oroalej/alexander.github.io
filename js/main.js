$(document).ready(function(){
  var experience = $('.experience'),
      currentIndex = 0,
      prevIndex = 3;

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

        timelineAttributes['events'].eq(prevIndex).removeClass('active');
        updateLineBar(getCurrentIndex('next', timelineAttributes['events']), timelineAttributes);
        updateCount(currentIndex, timelineAttributes['navigations']);
        updateContent(timelineAttributes['content'], 'next');
      });

      timelineAttributes['navigations'].on('click', '.prev', function(event){
        event.preventDefault();

        timelineAttributes['events'].eq(prevIndex).removeClass('active');
        updateLineBar(getCurrentIndex('prev', timelineAttributes['events']), timelineAttributes);
        updateCount(currentIndex, timelineAttributes['navigations']);
        updateContent(timelineAttributes['content'], 'prev');
      });

      $('.content').on('swipeleft', function(){
        updateLineBar(getCurrentIndex('next', timelineAttributes['events']), timelineAttributes);
        updateCount(currentIndex, timelineAttributes['navigations']);
        updateContent(timelineAttributes['content'], 'prev');
      })

      $('.timeline').on('swiperight', function(){
        updateLineBar(getCurrentIndex('prev', timelineAttributes['events']), timelineAttributes);
        updateCount(currentIndex, timelineAttributes['navigations']);
        updateContent(timelineAttributes['content'], 'prev');
      })

      timelineAttributes['eventWrapper'].on('click', 'a', function(event){
        event.preventDefault();
        if(currentIndex !== timelineAttributes['events'].index($(this))){
          prevIndex = currentIndex;
          currentIndex = timelineAttributes['events'].index($(this));

          var direction = prevIndex > currentIndex ? 'next' : 'prev';
          updateLineBar(timelineAttributes['events'].eq(currentIndex), timelineAttributes);
          updateCount(currentIndex, timelineAttributes['navigations']);
          updateContent(timelineAttributes['content'], direction);
        }
      });

      $(window).resize(function(){
        updateLineBar(timelineAttributes['events'].eq(currentIndex), timelineAttributes);
      })

      if($(window).width() <= 576) {
        updateLineBar(timelineAttributes['events'].eq(currentIndex), timelineAttributes);
      }
    });
  }

  // Update Counter
  var updateCount = function(index, element){
    element.find('#count').text(index + 1 + " / 4");
  }

  // For Mobile devices
  var setDatePosition = function(index, timelineAttributes){

  }

  // Update content
  var updateContent = function(element, direction){
    if(direction == 'next'){
      var classEnter = "active enter-left",
          classExit = "item exit-left";
    } else if(direction == 'prev'){
      var classEnter = "active enter-left",
          classExit = "item exit-right";
    }

    element.eq(currentIndex).addClass(classEnter);
    element.eq(prevIndex).attr('class', classExit).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			element.removeClass('enter-left enter-right exit-right exit-left');
		});
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
        currentIndex = i;
        return false;
      }
    });

    selectedEvent.addClass('active');
    timelineAttributes['lineBar'].css('width', TotalWidth);
  }

  var getCurrentIndex = function(direction, elements){
    var arrayLength = elements.length - 1;
    prevIndex = currentIndex;

    if(direction == 'next'){
      currentIndex = (arrayLength <= currentIndex++ ? 0 : currentIndex);
    } else if(direction == 'prev'){
      currentIndex = (0 <= currentIndex-- ? currentIndex : arrayLength);
    }

    return elements.eq(currentIndex);
  }

  main(experience);
});
