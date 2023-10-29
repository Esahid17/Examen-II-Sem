import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  describe('Creación de elementos', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Operaciones de tabla amortización', () => {
    it('should display prestamos when mostrarTabla is called', () => {
      const idClient = 1;
      const spy = spyOn(apiService, 'getPrestamosCliente').and.callThrough();
      component.mostrarTabla(idClient);
      expect(spy).toHaveBeenCalledWith(idClient);
    });
  });
});
