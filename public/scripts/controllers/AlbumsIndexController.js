angular
    .module('tunely')
    .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http', '$sce'];

function AlbumsIndexController($http, $sce) {
    var vm = this;
    vm.newAlbum = {};
    vm.newAlbum = {
            name: 'Viva Hate',
            artistName: 'Morrissey'
        },
        spotifyUrl = 'https://api.spotify.com/v1/search?q=album:';
    var spotifyEmbed = 'https://embed.spotify.com/?uri=',
        userName = '&user:129721589';
    var type = '&type=album';

    $http({
        method: 'GET',
        url: '/api/albums'
    }).then(function successCallback(response) {
        vm.albums = response.data;
        console.log(vm.albums)
    }, function errorCallback(response) {
        console.log('There was an error getting the data', response);
    });
    vm.getSpotify = function() {
        $http({
            method: 'GET',
            url: spotifyUrl + vm.newAlbum.name + type,
        }).then(succesfulSpotify, errorCallback);
    }

    function succesfulSpotify(res) {
        var topPick = res.data.albums.items[0];
        var trustUrl = spotifyEmbed +
            topPick.uri + userName;
        //set newAlbum.uri equal to trust url
        vm.newAlbum.uri = trustUrl;
        vm.newAlbum.image = topPick.images[1].url;
        vm.createAlbum();
        console.log(vm.newAlbum)
    }
    vm.createAlbum = function() {
        // console.log(vm.newAlbum)

        $http({
            method: 'POST',
            url: '/api/albums',
            data: vm.newAlbum
        }).then(function successCallback(response) {
            console.log(response)
            vm.albums.push(response.data);
        }, function errorCallback(response) {
            console.log('There was an error posting the data', response);
        });
    }

    vm.editAlbum = function(album) {
        $http({
            method: 'PUT',
            url: '/api/albums/' + album._id,
            data: album
        }).then(function successCallback(json) {
            // don't need to do anything!
        }, function errorCallback(response) {
            console.log('There was an error editing the data', response);
        });
    }
    vm.addSpotify = function(album) {
        $http({
            method: 'GET',
            url: spotifyUrl + album.name + type
        }).then(function(res) {
            console.log(res.data)
        })
    }

    vm.deleteAlbum = function(album) {
        $http({
            method: 'DELETE',
            url: '/api/albums/' + album._id
        }).then(function successCallback(json) {
            var index = vm.albums.indexOf(album);
            vm.albums.splice(index, 1)
        }, errorCallback);
    }

    function errorCallback(response) {
        console.log('There was an error deleting the data', response);
    }

}
