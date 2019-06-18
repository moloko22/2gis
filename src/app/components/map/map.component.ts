import { Component, OnInit } from '@angular/core';
import { MapService } from "../../map.service";
import * as DG from '2gis-maps';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  popup = false;
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
    //Если нужно брать мои координаты с базы данных, тогда сделал проверку на title в
    // функции showRes()
    DG.marker([46.482509, 30.718528], {title: "Ilya is here"}).addTo(this.group);
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
  send(arr){
    this.group.remove(this.map);
    for(var i = 0; i < arr.length; i++){
      this.data.sendData(arr[i]);
    }
  }
  get() {
    this.popup = !this.popup;
    this.data.getData()
      .subscribe(tasks => {
        this.coordinates = tasks;
        this.showRes(this.coordinates);
        this.popup = !this.popup;
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
}
