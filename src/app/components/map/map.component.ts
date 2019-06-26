import { Component, OnInit } from '@angular/core';
import { MapService } from "../../map.service";
import * as DG from '2gis-maps';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  coordinates = [];
  group = DG.layerGroup();
  constructor (private data: MapService) {}
  ngOnInit() {
    this.generateMap();
    this.get();
  }
  generateMap(){
    this.map = DG.map('map', {
      'center': [46.486062, 30.727981],
      'zoom': 14,
      'doubleClickZoom': false,
    });
    DG.control.location(DG.Control.LocationControl, {drawCircle: true, follow: true, StopFollowingOnDrag: true}).addTo(this.map);
    this.group.addTo(this.map);
    this.addMarker(this.coordinates, this.group);
  }
  addMarker(arr, group){
    this.map.on('click', function(ev){
      var obj = {
        lat: null,
        lng: null
      };
      obj.lat = ev.latlng.lat;
      obj.lng = ev.latlng.lng;
      DG.marker([obj.lat, obj.lng]).addTo(group);
      group.addTo(this);
      arr.push(obj);
    });
  }
  send(){
    for(var i = 0; i<this.coordinates.length;i++){
      this.data.sendData(this.coordinates[i])
    }
    this.group.remove(this.map);
  }
  get() {
    this.data.getData()
      .subscribe(tasks => {
        this.coordinates = tasks;
        this.showRes(this.coordinates);
      });
  }
  showRes(arr){
    if(arr.length){
      for(var i = 0; i < arr.length; i++){
        if(arr[i].title){
          DG.marker([arr[i].lat, arr[i].lng], {title: arr[i].title}).addTo(this.group);
        }else{
          DG.marker([arr[i].lat, arr[i].lng]).addTo(this.group);
        }
      }
      this.group.addTo(this.map);
    }
  }
  getList(name){
    this.data.list(name)
      .subscribe(res=>{

      })
  }
}
