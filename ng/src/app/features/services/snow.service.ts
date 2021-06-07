import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {THREE} from 'aframe';
import {Particle3D} from '../models/particle3-d';

@Injectable({
  providedIn: 'root'
})
export class SnowService {

  private isRegistered = false;

  constructor() {
  }

  register(): void {

    if (!this.isRegistered) {
      this.isRegistered = true;

      AFRAME.registerComponent('snow', {

        init(): void {
          const self = this;
          let particle;
          this.particles = [];
          if (environment.introScreen) {
            const scene = this.el.sceneEl.object3D;

            // Disable curtain
            document.getElementById('curtain').setAttribute('visible', 'false');

            const particleImage = new Image(); // THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
            particleImage.src = 'assets/snow.png';

            const material = new THREE.PointsMaterial({map: new THREE.Texture(particleImage)});

            for (let i = 0; i < 500; i++) {

              particle = new Particle3D(material);
              particle.position.x = Math.random() * 200 - 100;
              particle.position.y = Math.random() * 200 - 100;
              particle.position.z = Math.random() * 200 - 195;
              particle.scale.x = particle.scale.y = .25;
              scene.add(particle);

              this.particles.push(particle);
            }
          }

          // Todo: True onload
          const waitingTime = environment.introScreen ? 15000 : 1;
          // @ts-ignore
          document.querySelector('a-assets').fileLoader.manager.onLoad = (() => {
            console.log('Load!');

            setTimeout(() => {
              document.getElementById('w-sphere').removeAttribute('snow');

              // Curtain
              document.getElementById('curtain').setAttribute('visible', 'true');
              // @ts-ignore
              document.getElementById('curtain').emit('fadelong');

              setTimeout(() => {
                // document.getElementById('sky-55').setAttribute('initial-sphere', 'next: 52, 57');
                document.getElementById('sky-p0').setAttribute('initial-sphere', 'next: p1');

                document.getElementById('welcome').setAttribute('visible', 'false');

                // @ts-ignore
                document.getElementById('curtain').emit('fadelongback');

                document.getElementById('nav-map').dispatchEvent(new CustomEvent('change-position', {
                  detail: {
                    position: self.el.getAttribute('position')
                  }
                }));
              }, 600);


            }, waitingTime);


          });
        },

        tick(): void {
          if (environment.introScreen) {
            this.particles.forEach((particle) => {
              particle.updatePhysics();

              const pp = particle.position;

              if (pp.y < -10) {
                pp.y += 110;
              }
              if (pp.x > 100) {
                pp.x -= 200;
              } else if (pp.x < -100) {
                pp.x += 200;
              }
              if (pp.z > 5) {
                pp.z -= 100;
              } else if (pp.z < -100) {
                pp.z += 105;
              }
            });
          }
        },

        remove(): void {
          this.particles.forEach((particle) => {
            particle.geometry.dispose();
            particle.material.dispose();
            this.el.sceneEl.object3D.remove(particle);
          });
        }
      });
    }
  }
}
