import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalID!: number;
  animal$!: Observable<Animal>;

  constructor(
    private AnimaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalID = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.AnimaisService.buscaPorID(this.animalID)
  }

  curtir() {
    this.AnimaisService.curtir(this.animalID).subscribe((curtida) => {
      if(curtida) {
        this.animal$ = this.AnimaisService.buscaPorID(this.animalID)
      }
    })
  }

  excluir(){
    this.AnimaisService.excluirAnimal(this.animalID).subscribe(() => {
      this.router.navigate(['/animais/'])
    }, (error) => console.log(error))
  }
}
