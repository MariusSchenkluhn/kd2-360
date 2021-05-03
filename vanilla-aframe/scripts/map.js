// Navigation Map

let isMapOpen = false;

function openMap() {
    if (!isMapOpen) {
        isMapOpen = true;
        const map = document.getElementById('nav-map');
        map.dispatchEvent(new CustomEvent('open'));
        const pos = positionInFrontOf(camera, cursor, 1, -.5)
        map.setAttribute('position', '' + pos.x + ' ' + pos.y + ' ' + pos.z);
        map.setAttribute('visible', 'true');
    }
}

function closeMap() {
    if (isMapOpen) {
        const map = document.getElementById('nav-map');
        map.dispatchEvent(new CustomEvent('close'));
        map.setAttribute('visible', 'false');
        isMapOpen = false;
    }
}

AFRAME.registerComponent('nav-map', {

    init: function () {
        const self = this.el;
        this.el.children[2].dispatchEvent(new CustomEvent('blink'));

        this.el.addEventListener('change-position', function (e) {
            const position = e.detail.position;

            let x = (position.x + 28) / ((28 - 11) * 2) * .8 - .4;
            let z = (-position.z + 4.3) / ((4.3 + 7) * 2) * .4 - .2;

            self.children[2].setAttribute('position', '' + x + ' ' + z + ' 0.02');
        });
    }
});

// Close map
AFRAME.registerComponent('nav-map-close', {

    init: function () {
        this.el.addEventListener('click', function () {
            closeMap();
        });
    },
});
