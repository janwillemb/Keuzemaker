angular.module('starter.controllers', [])
    .controller('KeuzemakerController', function($scope) {

        var keuzes = [];
        var startInfoText = "Tussen welke opties kun je niet kiezen?";

        function nieuweLegeKeuze(ix) {
            return {
                value: '',
                index: ix,
                gekozen: false,
                frozen: false
            };
        }

        function voegKeuzeToe() {
            keuzes.push(nieuweLegeKeuze(keuzes.length + 1));
        }

        function onChange(ix) {
            if (ix === keuzes.length) {
                //de laatste dus
                if (keuzes[ix - 1].value) {
                    voegKeuzeToe();
                }
            }
        }

        function kies() {
            var i;
            var opties = keuzes.concat([]);
            keuzes.length = 0;
            var ix = 0;
            for (i = 0; i < opties.length; i++) {
                if (opties[i].value) {
                    ix++;
                    keuzes.push(opties[i]);
                    opties[i].index = ix;
                }
            }

            if (keuzes.length < 2) {
                alert("Vul minstens twee opties in...");
                for (i = keuzes.length; i < 2; i++) {
                    voegKeuzeToe();
                }
            } else {
                var optie = getRandomInt(0, keuzes.length);
                keuzeGemaakt(keuzes[optie]);
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function keuzeGemaakt(optie) {
            for (var i = 0; i < keuzes.length; i++) {
                keuzes[i].gekozen = keuzes[i] === optie;
                keuzes[i].frozen = true;
            }
            $scope.infoText = "De keuze is:";
        }

        function opnieuw() {
            keuzes.length = 0;
            //voeg eerste twee, lege keuzes toe
            voegKeuzeToe();
            voegKeuzeToe();
            
            $scope.infoText = startInfoText;
        }

        opnieuw();

        $scope.keuzes = keuzes;
        $scope.voegKeuzeToe = voegKeuzeToe;
        $scope.kies = kies;
        $scope.opnieuw = opnieuw;
        $scope.onChange = onChange;
        $scope.infoText = startInfoText;

    });