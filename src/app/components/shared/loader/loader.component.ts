import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{

  show = false;
  
  constructor(private service: LoaderService, private changes: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.service.getIsLoading().subscribe((isLoading) => {
      this.show = isLoading === true;
      this.changes.detectChanges();
    })
  }


}
