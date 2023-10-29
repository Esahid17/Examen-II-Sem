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
    // Configuración de las pruebas
    await TestBed.configureTestingModule({
      declarations: [HomeComponent], // Componente a probar
      imports: [
        HttpClientTestingModule, // Módulo para simular peticiones HTTP
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  // Prueba relacionada con la creación del componente Home
  describe('Creación de elementos', () => {
    it('should create', () => {
      // Verifica si el componente se ha creado exitosamente
      expect(component).toBeTruthy();
    });
  });

  // Pruebas relacionadas con operaciones de la tabla de amortización
  describe('Operaciones de tabla amortización', () => {
    it('should display prestamos when mostrarTabla is called', () => {
      // Simula la llamada a mostrar la tabla de amortización
      const idClient = 1;
      const spy = spyOn(apiService, 'getPrestamosCliente').and.callThrough();
      component.mostrarTabla(idClient);

      // Verifica si se llamó a la función con el ID del cliente correspondiente
      expect(spy).toHaveBeenCalledWith(idClient);
    });
  });
});
