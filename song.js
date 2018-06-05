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
    audio.src="//dl.stream.qqmusic.qq.com/C4000012wpTL1jLNhJ.m4a?vkey=73876FEB1AB07CFC08B7F8AC3910F22A97A0418BD330F50E3083158DD136E5F314B0AEF239E5C75931DB0AD7A14E8C7CC8D481110FAE75E3&guid=5035692450&uin=0&fromtag=66"
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