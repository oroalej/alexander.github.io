$(document).ready(function(){
  var experience = $('#experience'),
      currentIndex = 0,
      prevIndex = 3,
      body = $('body');

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
        updateContent(timelineAttributes['content'], 'next');
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
      var classEnter = "active enter-right",
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

  $("#main-nav").find("a").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(section).offset().top-62
      });
  });

  $(document).scroll(function(){
    var $nav = $("nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    $('#scrollTop').toggleClass('hide', $(this).scrollTop() < 200);
  })

  $('#scrollTop').click(function(){
    $('html, body').animate({ scrollTop: 0}, 600);
    return false;
  });



  var modal = function(modalAttritubes){
    var modalAttritubes = {};


    modalAttritubes['body'] = $('body'),
    modalAttritubes['dimmable'] = modalAttritubes['body'].children('.dimmable'),
    modalAttritubes['modal'] = body.find('.modal');

    if($(window).width() > 575){

      $('#sample').on('click', 'img', function(){
        var target = $(this).data('target');
        modalAttritubes['image'] = modalAttritubes['modal'].find('[data-name="' + target + '"]');

        updateModal(modalAttritubes, 'active');
        setHeight(modalAttritubes['image'], modalAttritubes['modal']);

      });

      $('body').on('click', '.dimmable', function(){
        updateModal(modalAttritubes, null);
        setHeight(modalAttritubes['image'], modalAttritubes['modal']);

      });
    }

      $(window).resize(function(){
        if(modalAttritubes['modal'].hasClass('active'))
          setHeight(modalAttritubes['image'], modalAttritubes['modal']);
      });
  }

  var setHeight = function(element, modal){
    // If the height of the modal is higher than the screen, get the screen height.
    var windowHeight = $(window).height() * 0.85,
        imageHeight = element.height(),
        modalHeight = (imageHeight > windowHeight ? windowHeight: imageHeight);

    modal.css('height', modalHeight);
  }

  var updateModal = function(element, status){
    $.each(element, function(index){
      if(status == 'active')
        element[index].addClass('active');
      else
        element[index].removeClass('active');
    });
  }

  modal();
});
