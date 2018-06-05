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
    audio.src="http://dl.stream.qqmusic.qq.com/C4000012wpTL1jLNhJ.m4a?vkey=EB85F877C3CA715A0A012954B88A68C5585DEED0D3102B3916E1B0904CEAC7EE7E6D344FE90EE296F0A82D0DF2F5E62944B5C5894333825C&guid=5035692450&uin=0&fromtag=66"
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