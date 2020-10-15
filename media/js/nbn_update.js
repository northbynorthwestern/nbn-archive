/*
 * jQuery Color Animations
 * Copyright 2007, John Resig, MIT License.
 */
(function(jQuery){jQuery.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(i,attr){jQuery.fx.step[attr]=function(fx){if(!fx.colorInit){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);fx.colorInit=true;}fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";};});
function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3){return color;}if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)){return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];}if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)){return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];}
if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)){return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];}if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)){return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];}if(result=/rgba\(0, 0, 0, 0\)/.exec(color)){return colors.transparent;}return colors[jQuery.trim(color).toLowerCase()];}
function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=""&&color!="transparent"||jQuery.nodeName(elem,"body")){break;}attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);}var colors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],
darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],
red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};})(jQuery);

/* focus comment reply */
function focusreply(str) {
    jQuery('.newcomment').hide();
    if(str == 'toplevel')
        { jQuery('#newcomment-toplevel').show(); }
    else
        { jQuery('#comment-'+str+' .newcomment').show(); }
}

function focusreport(str) {
    jQuery('.comment-confirm').hide();
    jQuery('#comment-'+str+' .comment-confirm').show();
}

jQuery(document).ready(function() {
    /* set all of the comment votes click actions */
    jQuery.ajaxSetup({type: 'GET', dataType: 'text'});
    jQuery('.comment-vote').each(function(index, elem) {
        var voter_arrows = jQuery(elem).children();
        var voteup_arrow = voter_arrows[0];
        var votedn_arrow = voter_arrows[1];
        var point_div = jQuery(elem).parent().find('.comment-points')
        var points = parseInt(point_div.html())
        var comment_pk = jQuery(elem).parent().attr('id').split("comment-")[1]
        jQuery(voteup_arrow).click(function() {
            if(jQuery(voteup_arrow).hasClass('comment-vote-up-inactive')) {
                jQuery(voteup_arrow).removeClass('comment-vote-up-inactive');
                jQuery(voteup_arrow).addClass('comment-vote-up-active');
                jQuery.ajax({'url': window.location.href+'comment/'+comment_pk+'/upvote/'});
                points += 1;
            } else {
                jQuery(voteup_arrow).removeClass('comment-vote-up-active');
                jQuery(voteup_arrow).addClass('comment-vote-up-inactive');
                jQuery.ajax({'url': window.location.href+'comment/'+comment_pk+'/removevote/'});
                points -= 1;
            }
            if(jQuery(votedn_arrow).hasClass('comment-vote-down-active')) {
                jQuery(votedn_arrow).removeClass('comment-vote-down-active');
                jQuery(votedn_arrow).addClass('comment-vote-down-inactive');
                points += 1;
            }
            if(points == 1) {
                jQuery(point_div).html('1 point');
            } else {
                jQuery(point_div).html(String(points)+' points');
            }
            if(points > 0) {
                jQuery(point_div).addClass('comment-points-pos');
            } else if(points < 0) {
                jQuery(point_div).addClass('comment-points-neg');
            } else {
                jQuery(point_div).removeClass('comment-points-pos');
                jQuery(point_div).removeClass('comment-points-neg');
            }
        });
        jQuery(votedn_arrow).click(function() {
            if(jQuery(this).hasClass('comment-vote-down-inactive')) {
                jQuery(this).removeClass('comment-vote-down-inactive');
                jQuery(this).addClass('comment-vote-down-active');
                jQuery.ajax({'url': window.location.href+'comment/'+comment_pk+'/downvote/'});
                points -= 1;
            } else {
                jQuery(this).removeClass('comment-vote-down-active');
                jQuery(this).addClass('comment-vote-down-inactive');
                jQuery.ajax({'url': window.location.href+'comment/'+comment_pk+'/removevote/'});
                points += 1;
            }
            if(jQuery(voteup_arrow).hasClass('comment-vote-up-active')) {
                jQuery(voteup_arrow).removeClass('comment-vote-up-active');
                jQuery(voteup_arrow).addClass('comment-vote-up-inactive');
                points -= 1;
            }
            if(points == 1) {
                jQuery(point_div).html('1 point');
            } else {
                jQuery(point_div).html(String(points)+' points');
            }
            if(points > 0) {
                jQuery(point_div).addClass('comment-points-pos');
            } else if(points < 0) {
                jQuery(point_div).addClass('comment-points-neg');
            } else {
                jQuery(point_div).removeClass('comment-points-pos');
                jQuery(point_div).removeClass('comment-points-neg');
            }

        });
    });
});

function fixBoxSides() {
    /* change all the box side heights to stretch to size of middle */
    jQuery('.box-left').each(function(index, elem) {
        var newHeight = jQuery(elem).next().innerHeight();
        jQuery(elem).height(newHeight);
    });
    jQuery('.box-right').each(function(index, elem) {
        var newHeight = jQuery(elem).prev().innerHeight();
        jQuery(elem).height(newHeight);
    });
}

jQuery(window).load(function() {
    /* remove elements that overflow specific sections */
    while(jQuery('.box-news .box-inside').height() > 320) {
        jQuery('.newsitem').last().remove();
    }
    // while(jQuery('.box-comments .box-inside').height() > 640) {
    //     jQuery('.commentitem').last().remove();
    // }
    while(jQuery('.box-ontheblogs .box-inside').height() > 640) {
        jQuery('.blogitem').last().remove();
    }
    while(jQuery('.box-twitter .box-inside').height() > 520) {
        jQuery('.twitteritem').last().remove();
    }
    jQuery('.box-chrono .box-inside').each(function(index, elem) {
        while(jQuery(elem).height() > 400) {
            jQuery(elem).children('.chronoitem').last().remove();
        }
    });
    while(jQuery('.box-popular .box-inside').height() > 300) {
        jQuery('#popularlist li').last().remove();
    }

    fixBoxSides();
});

$(document).ready(function () {
    var switches = $('.switch');
    var stories = $('.switchStory');

    $(stories).hide();
	$(stories[0]).show();

    $(switches).click(function() {
         for (i=0; i<stories.length; i++) {
            if ($(this).index() == i) {
				console.log($(this).index());
				console.log($(stories[i]).index());
				console.log('hai');
                $(stories[i]).show();
            }
            else {
				console.log($(this).index());
				console.log($(stories[i]).index());
				console.log('bai');
                $(stories[i]).hide();
            }
        }
    });

	$(switches).hover(function(){
        $(this).fadeTo("fast", 0.5)
    },function(){
        $(this).fadeTo("fast", 1)
    });
});


