var gallery = {
    user: '',
    cat: '',
    type: '',
    loaded: 0,
    max: 50,
    more: true,

    loadCollection: function() {
        if(this.more)
        {
            api = 'http://api.douban.com/people/' + this.user + '/collection?alt=xd&callback=?';
            $.getJSON(api, { 'cat': this.cat, 'status': this.type, 'start-index': this.loaded + 1, 'max-results': this.max }, addCollection);
        }
    },
}

function addCollection(collection) {
    gallery.loaded += collection.entry.length;
    if(collection.entry.length < gallery.max)
        gallery.more = false;

    $.each(collection.entry, function(i, item) {
        img = item['db:subject']['link'][2]['@href'].replace('spic', 'mpic');
        url = item['db:subject']['link'][1]['@href'];
        alt = item['db:subject']['title']['$t'];
        $('<img/>').attr('src', img).appendTo("#gallery").wrap('<a title="' + alt + '" href="' + url + '"></a>');
    });
}

$(function() {
    gallery.user = 'hzqtc';
    gallery.cat = 'movie';
    gallery.type = 'watched';
    gallery.loadCollection();

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            gallery.loadCollection();
        }
    });
});
