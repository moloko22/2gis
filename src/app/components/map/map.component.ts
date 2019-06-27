import { Component, OnInit } from '@angular/core';
import { MapService } from "../../map.service";
import * as DG from '2gis-maps';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  submitted = false;
  map;
  coordinates = [];
  group = DG.layerGroup();
  constructor (private data: MapService) {}
  ngOnInit() {
    this.generateMap();
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
    let sub = this.submitted;
      this.map.on('click', function(ev){
        if(!sub){
          var obj = {
            lat: null,
            lng: null
          };
          obj.lat = ev.latlng.lat;
          obj.lng = ev.latlng.lng;
          DG.marker([obj.lat, obj.lng]).addTo(group);
          group.addTo(this);
          arr.push(obj);
        }
      });
  }
  send(){
    this.group.remove(this.map);
    for(var i = 0; i < this.coordinates.length; i++){

      this.data.sendData(this.coordinates[i])
        .then(res=> {
          console.log(res);
        })
        .catch(err=>{
          console.log(err)
        })
    }
    this.group.clearLayers();
    this.submitted = !this.submitted;
  }
  get() {
    this.data.getData()
      .subscribe(coordinates => {
        for(var i = 0; i < coordinates.length; i++){
          this.coordinates[i] = coordinates[i]
        }
        this.showRes(this.coordinates);
      });
    this.submitted = !this.submitted;
  }
  showRes(arr){
    if(arr.length){
      for(var i = 0; i < arr.length; i++){
        if(!arr[i].title){
          arr[i].title = arr[i].name;
        }
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
    this.group.remove(this.map);
    this.group.clearLayers();
    this.data.list(name)
      .subscribe(res=>{
        this.showRes(res);
      })
  }
}
