var gallery = {
    user: '',
    cat: '',
    type: '',
    loaded: 0,
    max: 50,
    more: true,

    loadCollection: function() {
        if(this.more && this.user != '')
        {
            api = 'http://api.douban.com/people/' + this.user + '/collection?alt=xd&callback=?';
            $.getJSON(api, { 'cat': this.cat, 'status': this.type, 'start-index': this.loaded + 1, 'max-results': this.max }, addCollection);
        }
    },
    
    loadFavSongs: function() {
        if(this.more && this.user != '')
        {
            api = 'http://api.douban.com/people/' + this.user + '/favsongs?alt=xd&callback=?';
            $.getJSON(api, { 'start-index': this.loaded + 1, 'max-results': this.max }, addFavSongs);
        }
    }
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
    $(window).on('scroll', autoload);
}

function addFavSongs(collection) {
    gallery.loaded += collection.entry.length;
    if(collection.entry.length < gallery.max)
        gallery.more = false;

    $.each(collection.entry, function(i, item) {
        img = item['cover']['$t'].replace('spic', 'mpic');
        url = item['subject_url']['$t'];
        alt = item['title']['$t'];
        $('<img class="song"/>').attr('src', img).appendTo("#gallery").wrap('<a title="' + alt + '" href="' + url + '"></a>');
    });
    $(window).on('scroll', autoload);
}

function autoload() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $(window).off('scroll', autoload);
        //gallery.loadCollection();
        gallery.loadFavSongs();
    }
}

$(function() {
    url = window.location.href;
    gallery.user = url.substr(url.lastIndexOf('#') + 1);
    //gallery.cat = 'movie';
    //gallery.type = 'watched';
    gallery.loaded = 0;
    //gallery.loadCollection();
    gallery.loadFavSongs();
});
