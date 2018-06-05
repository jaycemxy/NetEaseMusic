$(function(){
    $.get('/lyric.json').then(function(object){
        let {lyric} = object
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function(string, index){
            let matches = string.match(regex)
            if(matches){
                return {time: matches[1], words: matches[2]}
            }
        })
        let $lyric = $('.lyric')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    })

    let audio = document.createElement('audio')
    audio.src="//p9ujxuvsr.bkt.clouddn.com/%E6%88%90%E5%85%A8-%E6%9E%97%E5%AE%A5%E5%98%89.mp4"
    audio.oncanplay = function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click', function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click', function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })
})