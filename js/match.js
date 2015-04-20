/*
* Match The Card Game
* Simples card matching game exercise to learn underscoresjs
* @see http://underscorejs.org/
* autor - Mario Andrade ( twitter.com/mariorandrade )
*
* **/

(function($, _){

    var MatchMe = function ()
    {

        /*
         * App defaults
         * @param selected - array used to store user selected cards
         * @param combinations - array with matching combinations
         * @param matched - store matched combinations (combinations[] == selected[] ))
         * @param cars - card deck for the game
         * */

        var defaults = {
            selected :      [],
            combinations:   [[0, 4], [1,3], [2,5], [4,0], [3,1], [5,2]],
            matched:        [],
            timer : 0,
            cards: [
                '<div class="card" data-index="0"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>',
                '<div class="card" data-index="1"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>',
                '<div class="card" data-index="2"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>',
                '<div class="card" data-index="3"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>',
                '<div class="card" data-index="4"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>',
                '<div class="card" data-index="5"><div class="face front show"><img src="data:image/png;base64,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" /></div><div class="face back hide"></div>'
            ]
        };


        /*
         * @function hideCard()
         * Helper function for hide card effect
         * @param elem_in - element to hide
         * */

        var hideCard = function ( elem_in )
        {
            var front = $(elem_in).find('.front');
            var back = $(elem_in).find('.back');

            front.removeClass('show').addClass('hide');
            back.removeClass('hide').addClass('show');
            $(elem_in).removeClass('active');

        };

        /*
         * @function showCard()
         * Helper function for show card effect
         * @param elem_in - element to show
         * */

        var showCard = function ( elem_in ) {
            var front = $(elem_in).find('.front');
            var back = $(elem_in).find('.back');

            $(elem_in).addClass('active');
            back.removeClass('show').addClass('hide');
            front.removeClass('hide').addClass('show');
            addToSelected(elem_in);
        };


        /*
         * @function addToSelected()
         * Adds clicked item to selected array
         * @param elem_in - element
         * */

        var addToSelected = function ( elem_in ) {

            defaults.selected.push( $(elem_in).data('index') );
            if(defaults.selected.length == 2) {
                checkIfMatch();
            }
        };

        /*
         * @function checkIfMatch()
         * Check if both selected cards are a match any combination
         *
         * */

        var checkIfMatch = function()
        {

            if (_.filter(defaults.combinations, defaults.selected).length ) {
                setMatched();
            }

            else {
                setTimeout(function() {
                    hideCard($('.active'));
                    defaults.selected.length = 0;
                },1000);
            }
        };

        /*
         * @function setMatched()
         * Store cards in matched array when clicked cards match a combination
         *
         * */

        var setMatched = function () {

            defaults.matched.push(defaults.selected);
            defaults.selected.length =0;
            $('.active').addClass('matched');
            $('.active').removeClass('active');

            if(isCompleted()) {
                stopTimer('You Win');

            }

        };


        /*
         * @function shuffleCards()
         * Helper function for to shuffle cards
         *
         * */


        var shuffleCards = function () {

            var deck =_.shuffle(defaults.cards);

            return deck;
        };

        /*
         * @function eventHandlers()
         * Function to store event handlers
         *
         * */

        var eventHandlers = function() {

            console.log('event.handlers');
            $('body').on('click', '.action-button', function(e) {
                console.log('click');
                e.preventDefault();
                setup();
            });

            $('body').on('click', '.card', function(e) {
                e.preventDefault();
                var isHidden = $(this).find('.front').hasClass('hide');

                if(defaults.selected.length < 2) {
                    if( isHidden ) {
                        showCard( $(this) );
                    }
                }
            });

        };

        /*
         * @function isCompleted()
         * Check if user has matched all the cards
         * matched array is only feeded when a match is correct.
         * Combinations array has to have all sides of a combination
         * ex: combinations[[1,2], [2,1]]
         *
         * because the user might click on card #2 first
         * therefore the total number of possible combinations is half of the combinations.length
         *
         * */

        var isCompleted = function() {
            var output = false;
            if(defaults.matched.length == (defaults.combinations.length/2) )  {
                output = true;
            }

            return output;
        };

        /*
         * @function dealCards()
         *
         * */

        var dealCards = function() {
            var deck =  shuffleCards(); //
            var d = 200;
            var h = 2500;

            $('.game-board').append( deck ); //present the deck;

            $('.card').each(function() {
                var front = $(this).find('front');
                var back = $(this).find('back');
                $(this).fadeIn(d);
            });

            setTimeout(function() {
                hideCard( $('.card') );
            }, h);

            setTimeout(function() {
                startTimer();
            }, 3000 );
        };

        var startTimer = function() {

            var timeUsed = 0;
            var container = $("#timer").find(".text");
            $('.canvas').addClass('danger');
            $('#timer').fadeIn(function() {
                defaults.timer = setInterval(function() {

                    if(timeUsed > 59) {
                        stopTimer('You Loose');
                        container.addClass('loose');
                    }

                    else {
                        container.html(timeUsed);
                    }

                    timeUsed++;
                }, 1000);
            });
        };




        var stopTimer = function(msg_in) {
            clearInterval(defaults.timer);

            if(msg_in != undefined ) {
                $('#timer').find('.text').html(msg_in);
            }

        };


        /*
         * @function setup()
         *
         * */

        var setup = function() {

            $('.actions').fadeOut(500, function() {
                $('.game-board').fadeIn(200, function() {
                    dealCards();
                });
            });


        };

        /*
         * @function init()
         *
         * */


        var init = function() {
            eventHandlers(); //start event handlers for the game;

        };

        return {
            init: init()
        }

    }.call(this);





} ($ , _)); //requires jQuery ($) and underscorejs (_)
