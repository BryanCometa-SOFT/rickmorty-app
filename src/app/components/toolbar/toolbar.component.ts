import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';
import { StorageProvider } from 'src/app/providers/storage.provider';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoged: boolean = false;
  /**
   * @Constructor
   * @param router Parametro con la navegacion
   */
  constructor(private router: Router, private storageProvider:StorageProvider) { }

  ngOnInit(): void {
    if(this.storageProvider.getItem(EStorageKeys.token)){
      this.isLoged = true;
    }
  }

  /**
   * redirectUrl
   * @param router Parametro con la navegacion
   */
  redirectUrl(url: string) : void{
    this.router.navigate([url]);
  }

}
