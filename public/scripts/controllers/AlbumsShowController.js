angular
    .module('tunely')
    .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams', '$sce'];

function AlbumsShowController($http, $routeParams, $sce) {
    var url = '/api/albums/' + $routeParams.id + '/songs/';
    var vm = this,
        spotifyUrl = 'https://api.spotify.com/v1/search?q=album:';
        var spotifyEmbed = 'https://embed.spotify.com/?uri=',
         userName = '&user:129721589';
    var type = '&type=album';
    vm.newSong = {};
    vm.album = {};

    vm.deleteSong = function(song) {
        var index = vm.album.songs.indexOf(song);
        console.log(index);

        $http({
            method: 'DELETE',
            url: url + song._id
        }).then(function deleteSuccess(res) {
            console.log(res);
            vm.album.songs.splice(index, 1);

        }, function handleErr(err) {
            console.log(err);
        })
    }


    vm.editSong = function(song) {
        $http({
            method: 'PUT',
            url: url + song._id,
            data: song
        }).then(function successEdit(res) {
            console.log(res);
        }, function(err) {
            console.log(err);
        });
    }
    vm.submitSong = function(newSong) {
        console.log(newSong);
        $http({
            method: 'POST',
            url: url,
            data: newSong
        }).then(function(res) {
            console.log(res);
            vm.album.songs.push(res.data);
        })
    }
    $http({
        method: 'GET',
        url: '/api/albums/' + $routeParams.id
    }).then(function successCallback(json) {
        vm.album = json.data;
        $http({
            method: 'GET',
            url: spotifyUrl + vm.album.name + type,
        }).then(function(res) {
          var topPick = res.data.albums.items[0];
            console.log(topPick)
            var trustUrl = spotifyEmbed +
            topPick.uri + userName;
            //set album.uri equal to trust url
            vm.album.uri = $sce.trustAsResourceUrl(trustUrl);
            vm.album.image = $sce.trustAsResourceUrl(topPick.images[1].url);
            console.log(vm.album)
        }, function(err) {
            console.log('err');
        })

    }, function errorCallback(response) {
        console.log('There was an error getting the data', response);
    });

}
