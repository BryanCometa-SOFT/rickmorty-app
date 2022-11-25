import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModel } from 'src/app/interfaces/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'episode', "characters"];
  dataSource:any = null; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router, private episodeService:EpisodeService) { }

  ngOnInit(): void {
    this.getAllEpisodes();
  }

  ngAfterViewInit() {
    
  }

  /**
   * redirectUrl
   * @param router Parametro con la navegacion
   */
   redirectUrl(url: string) : void{
    this.router.navigate([url]);
  }

  /**
	* @description Obtiene y descarga el listado de episodios
	*/
  getAllEpisodes() :void{
    this.episodeService.getAllEpisodes().then(resp=>{
      this.dataSource = new MatTableDataSource<TableModel>(resp.results);
      this.dataSource.paginator = this.paginator;
    }).catch(error=>{
      console.log(error);
    })
  }
}
