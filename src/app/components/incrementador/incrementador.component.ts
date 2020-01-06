import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress')
  private _txtProgress: ElementRef;
  public get txtProgress(): ElementRef {
    return this._txtProgress;
  }
  public set txtProgress(value: ElementRef) {
    this._txtProgress = value;
  }

  @Input() progreso: number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log( 'leyenda: ' +  this.leyenda);
    console.log( 'progreso: ' +  this.progreso);
  }

  ngOnInit() {
    console.log( 'leyenda: ' +  this.leyenda);
    console.log( 'progreso: ' +  this.progreso);
  }

  onChanges(newValue: number) {
    console.log(newValue);

    // let elemHTML = document.getElementsByName('progreso')[0];
    // console.log(elemHTML.value);

    if(newValue >= 100) {
      this.progreso = 100;
    } else if( newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}
