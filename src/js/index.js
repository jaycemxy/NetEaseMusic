$(function () {
    setTimeout(function () {
        $.get('../songs.json').then(function (response) {
            let items = response
            items.forEach((i) => {
                let $li = $(`
                <li>
                    <a href="./song.html?id=${i.id}">
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="icon SQsvg" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                            ${i.singer}
                        </p>
                        <svg class="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>
                `)
                $('#lastestMusic').append($li)
            })
            $('#lastestMusicLoading').remove()
        })
    }, 1000)

    $('.siteNav').on('click', 'ol.tabItems > li', function (e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange', index)
        $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
    })

    $('.siteNav').on('tabChange', function (e, index) {
        let $li = $('.tabContent > li').eq(index)
        if ($li.attr('data-downloaded') === 'yes') {
            return
        }
        if (index === 1) {
            $.get('../page2.json').then((response) => {
                return
                $li.text(response.content)
                $li.attr('data-downloaded', 'yes')
            })
        } else if (index === 2) {
            return
            $.get('../page3.json').then((response) => {
                $li.text(response.content)
                $li.attr('data-downloaded', 'yes')
            })
        }
    })

    let timer = undefined
    $('input#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') {
            return
        }

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output').text(result.map((r) => r.name).join(','))
                } else {
                    $('#output').text('没有结果')
                }
            })
        }, 300)
    })

    function search(keyword) {
        console.log('搜索' + keyword)
        return new Promise((resolve, reject) => {
            var database = [{
                    "id": 1,
                    "name": "爱了很久的朋友"
                },
                {
                    "id": 2,
                    "name": "椿"
                },
                {
                    "id": 3,
                    "name": "说散就散"
                },
                {
                    "id": 4,
                    "name": "春风吹"
                },
                {
                    "id": 5,
                    "name": "无条件"
                },
                {
                    "id": 6,
                    "name": "广东爱情故事"
                },
                {
                    "id": 7,
                    "name": "再也没有"
                },
                {
                    "id": 8,
                    "name": "慕容雪"
                },
                {
                    "id": 9,
                    "name": "甜葡萄 红眼睛"
                },
                {
                    "id": 10,
                    "name": "成全"
                }
            ]
            let result = database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                console.log('搜到' + keyword + '的结果')
                resolve(result)
            }, (Math.random() * 200 + 1000))
        })
    }
    window.search = search
})