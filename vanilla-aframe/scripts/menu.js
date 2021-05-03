// Menu

// Position in front of camera
let camera;
let cursor;
let isMenuOpen = false;

// Functions
function openMenu() {
    if (!isMenuOpen) {
        isMenuOpen = true;

        const menu = document.getElementById('menu');
        menu.setAttribute('visible', 'true');
        const pos = positionInFrontOf(camera, cursor, 1, -.5)
        menu.setAttribute('position', '' + pos.x + ' ' + pos.y + ' ' + pos.z);
        menu.dispatchEvent(new CustomEvent('open'));

        const menuIcon = document.getElementById('open-menu');
        menuIcon.dispatchEvent(new CustomEvent('close'));
        // menuIcon.setAttribute('visible', 'false');
    }
}

function closeMenu() {
    if (isMenuOpen) {
        const menu = document.getElementById('menu');
        menu.dispatchEvent(new CustomEvent('close'));
        // menu.setAttribute('visible', 'false'); // Set invisible by animation

        const menuIcon = document.getElementById('open-menu');
        menuIcon.dispatchEvent(new CustomEvent('open'));
        menuIcon.setAttribute('visible', 'true');
        isMenuOpen = false;
    }
}

// Components
// Open menu button
AFRAME.registerComponent('menu-open', {

    init: function () {
        camera = document.getElementById('cam-rig').object3D;
        cursor = document.getElementById('cursor').object3D;

        this.el.addEventListener('click', function () {
            openMenu();
        });
    },

    tick: function () {
        const pos = this.el.object3D.position;

        // Calculate target position
        const pos_target = positionInFrontOf(camera, cursor, .5, -.85);

        // Following the cursor smoothly
        pos.lerp(pos_target, menuButtonSmoothing);
    }
});

// Close menu
AFRAME.registerComponent('menu-close', {

    init: function () {
        this.el.addEventListener('click', function () {
            closeMenu();
        });
    },
});

// Button: Map
AFRAME.registerComponent('menu-open-map', {

    init: function () {
        this.el.addEventListener('click', function () {
            closeMenu();
            openMap();
        });
    },
});
