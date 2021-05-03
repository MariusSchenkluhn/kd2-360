// Vars
let currentSphere = null; // Current main sphere
let initialized = false; // Program initialized?
let isTransitioning = false; // Allow only one transition at the same time

// Set all spheres invisible
function setAllInvisible() {
    document.querySelectorAll('[id^="sky-"]').forEach((sphere => sphere.setAttribute('scale', '.001 .001 .001')));
}

// Set sphere as main
function setMainSphere(sphere, neighbourIds) {
    currentSphere = sphere;
    document.getElementById(sphere.id).setAttribute('scale', '1 1 1');

    // child 0: Sphere
    // child 1: Ground plate
    // child 2: Label
    // child 3: Floor Ring
    sphere.children[0].children[0].setAttribute('radius', '100');
    sphere.children[0].children[0].setAttribute('material', 'opacity: 1; color: #FFF');
    sphere.children[0].setAttribute('visible', 'true');
    if (useGroundPlate) sphere.children[1].setAttribute('visible', 'true');
    sphere.children[2].setAttribute('visible', 'false');
    sphere.children[3].setAttribute('visible', 'false');

    sphere.neighbourIds = Array.from(neighbourIds);
}

// Set sphere as neighbour
function setNeighbour(sphere) {
    if (sphere != null) {
        document.getElementById(sphere.id).setAttribute('scale', '1 1 1');

        // Sphere
        if (useSpheres) {
            sphere.children[0].setAttribute('visible', 'true');
            sphere.children[0].children[0].setAttribute('radius', sphereSize.toString());
            sphere.children[0].children[0].setAttribute('material', 'opacity: .7; color: #AAA');
        } else {
            sphere.children[0].setAttribute('visible', 'false');
        }
        sphere.children[1].setAttribute('visible', 'false');
        sphere.children[2].setAttribute('visible', 'true');
        if (!useText) sphere.children[2].children[0].children[0].children[0].setAttribute('visible', 'false');
        if (!useText && !useSpheres) sphere.children[2].setAttribute("position", "0 -2 0") // Set link position to floor ring
        if (useFloorRings) sphere.children[3].setAttribute('visible', 'true');
    }
}

// Meta function: Sets main and neighbour spheres
function updateMainSphere(sphere, neighbourIds) {
    setAllInvisible();
    setMainSphere(sphere, neighbourIds);
    neighbourIds.forEach((id) => setNeighbour(document.getElementById('sky-' + id)));
}

// Attribute: Initial sphere
AFRAME.registerComponent('initial-sphere', {

    schema: {
        next: {type: 'array'}
    },

    init: function () {
        if (!initialized) {
            initialized = true;

            // Set position
            updateMainSphere(this.el, this.data.next);
            document.querySelector("#cam-rig").setAttribute('position', currentSphere.object3D.position);
        }
    }
});

// Attribute: Link Navigation
AFRAME.registerComponent('nav', {

    schema: {
        next: {type: 'array'}
    },

    init: function () {
        const self = this;

        this.el.addEventListener('click', function () {
            // Block
            if (!isTransitioning) {
                isTransitioning = true;

                // Log target
                console.log('Location Update: Img ' + currentSphere.id + ' - Img ' + self.el.id);

                // Close curtain
                // Curtain becomes automatically invisible after fade animation
                document.getElementById('curtain').setAttribute('visible', 'true');
                document.getElementById('curtain').dispatchEvent(new CustomEvent('fade'));

                // Close menu & map
                closeMenu();
                closeMap();

                // Wait for dark animation
                setTimeout(() => {
                    // Set current sphere
                    currentSphere = self.el;

                    updateMainSphere(currentSphere, self.data.next);

                    // Change position
                    document.querySelector("#cam-rig").setAttribute('position', currentSphere.object3D.position);
                    document.getElementById('nav-map').dispatchEvent(new CustomEvent("change-position", {
                        detail: {
                            position: self.el.getAttribute('position')
                        }
                    }));

                    // Reset blocker
                    isTransitioning = false;

                }, 160);
            }
        });
    },
});

// Attribute: Click anywhere Navigation
AFRAME.registerComponent('click-nav', {

    init: function () {

        this.el.addEventListener('nav-click', function () {
            let minDistance = 10000;
            let minObject = null;
            let distance = 10000;

            if (!isMenuOpen) {
                currentSphere.neighbourIds.forEach((neighbourId) => {
                    const neighbour = document.getElementById('sky-' + neighbourId);

                    if (checkIfVisible(neighbour.children[2].children[0])) {

                        distance = document.getElementById('cam-rig').object3D.position.distanceTo(neighbour.object3D.position);
                        if (distance < minDistance) {
                            minDistance = distance;
                            minObject = neighbour;
                        }
                    }
                });

                if (minObject != null) {
                    // Notify close object
                    minObject.dispatchEvent(new CustomEvent('click'));
                }
            }
        });
    },
});
