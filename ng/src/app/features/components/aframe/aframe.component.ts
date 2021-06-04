import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {NavigationService} from '../../services/navigation.service';
import {CalcService} from '../../services/calc.service';
import {MapService} from '../../services/map.service';
import {SnowService} from '../../services/snow.service';
import {AnalyticsService} from '../../services/analytics.service';
import {environment} from '../../../../environments/environment';
import {MediaService} from '../../services/media.service';
import 'aframe';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css']
})

export class AframeComponent implements OnInit, AfterViewInit {
  @ViewChild('scene') theScene: ElementRef;
  gltfModels: GltfModel[] = [
    new GltfModel()
  ];

  constructor(
    private nav: NavigationService,
    private menu: MenuService,
    private calc: CalcService,
    private map: MapService,
    private media: MediaService,
    private snow: SnowService,
    private analytics: AnalyticsService
  ) {
  }

  ngOnInit(): void {
    this.analytics.register();
    this.menu.register(this.map);
    this.nav.register(this.map, this.menu);
    this.map.register();
    this.media.register();
    this.snow.register();
    this.calc.registerLookAt();

    // Aframe stats
    if (!environment.production) {
      document.querySelector('a-scene').setAttribute('stats', '');
    }
  }

  ngAfterViewInit(): void {
    console.log("Found theScene " + this.theScene.nativeElement.tagName);
  }
}

class GltfModel {

  constructor() {

  }
}
