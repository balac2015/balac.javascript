var id = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split('&')[0].split('=')[1] : 1;
id = (id > 5 ? 1 : id);
$('#share-banner' + id).show();
$('#show-banner' + id).show();
