// Attribute: Snow
const particles = [];
AFRAME.registerComponent('snow', {

    init: function () {
        const self = this;
        let particle;
        if (introScreen) {
            const scene = this.el.sceneEl.object3D;

            // Disable curtain
            document.getElementById('curtain').setAttribute('visible', 'false');

            const particleImage = new Image(); //THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
            particleImage.src = 'data/snow.png';

            const material = new THREE.PointsMaterial({map: new THREE.Texture(particleImage)});

            for (let i = 0; i < 500; i++) {

                particle = new Particle3D(material);
                particle.position.x = Math.random() * 200 - 100;
                particle.position.y = Math.random() * 200 - 100;
                particle.position.z = Math.random() * 200 - 195;
                particle.scale.x = particle.scale.y = .25;
                scene.add(particle);

                particles.push(particle);
            }
        }

        // Todo: True onload
        const waitingTime = introScreen ? 15000 : 1;
        document.querySelector('a-assets').fileLoader.manager.onLoad = (() => {
            console.log('Load!');

            setTimeout(() => {
                document.getElementById('w-sphere').removeAttribute('snow');

                // Curtain
                document.getElementById('curtain').setAttribute('visible', 'true');
                document.getElementById('curtain').emit('fadelong');

                setTimeout(() => {
                    document.getElementById('sky-55').setAttribute('initial-sphere', "next: 52, 57");

                    document.getElementById('welcome').setAttribute('visible', 'false');

                    document.getElementById('curtain').emit('fadelongback');

                    document.getElementById('nav-map').dispatchEvent(new CustomEvent("change-position", {
                        detail: {
                            position: self.el.getAttribute('position')
                        }
                    }));
                }, 600);


            }, waitingTime);


        });
    },

    tick: function () {
        if (introScreen) {
            for (let i = 0; i < particles.length; i++) {

                let particle = particles[i];
                particle.updatePhysics();

                let pp = particle.position;

                if (pp.y < -10) pp.y += 110;
                if (pp.x > 100) pp.x -= 200;
                else if (pp.x < -100) pp.x += 200;
                if (pp.z > 5) pp.z -= 100;
                else if (pp.z < -100) pp.z += 105;
            }
        }
    },

    remove: function () {
        particles.forEach((particle) => {
            particle.geometry.dispose();
            particle.material.dispose();
            this.el.sceneEl.object3D.remove(particle);
        })
    }
});


// Snow logic
{
    const TO_RADIANS = Math.PI / 180;

    Particle3D = function (material) {
        THREE.Sprite.call(this, material);

        //this.material = material instanceof Array ? material : [ material ];
        // define properties
        this.velocity = new THREE.Vector3(0, -.17, 0);
        this.velocity.rotateX(randomRange(-45, 45));
        this.velocity.rotateY(randomRange(0, 360));
        this.gravity = new THREE.Vector3(0, 0, 0);
        this.drag = 1;
        // methods...
    };

    Particle3D.prototype = new THREE.Sprite();
    Particle3D.prototype.constructor = Particle3D;

    Particle3D.prototype.updatePhysics = function () {
        this.velocity.multiplyScalar(this.drag);
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
    }

    THREE.Vector3.prototype.rotateY = function (angle) {
        const cosRY = Math.cos(angle * TO_RADIANS);
        const sinRY = Math.sin(angle * TO_RADIANS);

        const tempz = this.z;
        const tempx = this.x;

        this.x = (tempx * cosRY) + (tempz * sinRY);
        this.z = (tempx * -sinRY) + (tempz * cosRY);
    }

    THREE.Vector3.prototype.rotateX = function (angle) {
        const cosRY = Math.cos(angle * TO_RADIANS);
        const sinRY = Math.sin(angle * TO_RADIANS);

        const tempz = this.z;
        const tempy = this.y;

        this.y = (tempy * cosRY) + (tempz * sinRY);
        this.z = (tempy * -sinRY) + (tempz * cosRY);
    }

    THREE.Vector3.prototype.rotateZ = function (angle) {
        const cosRY = Math.cos(angle * TO_RADIANS);
        const sinRY = Math.sin(angle * TO_RADIANS);

        const tempx = this.x;
        const tempy = this.y;

        this.y = (tempy * cosRY) + (tempx * sinRY);
        this.x = (tempy * -sinRY) + (tempx * cosRY);
    }

    // Returns a random number between the two limits provided
    function randomRange(min, max) {
        return ((Math.random() * (max - min)) + min);
    }
}
