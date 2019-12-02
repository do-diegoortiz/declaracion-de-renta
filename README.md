# Declara Renta
[Ver la app](https://declaracion-de-renta.now.sh/)

## Iniciar
* `yarn` para agregar los node_modules (NO usar `npm install`)
* `yarn dev` para iniciar el proyecto
* Abrir http://localhost:3000 en el navegador

## ¿Qué puedo hacer?
Ingresar todos los ingresos del año, todas las deducciones. El sistema calculara el valor óptimo que deberias gastar en medicina prepagada, pensiones voluntarias, dependientes, intereses de vivienda y donaciones.

## Test Unitarios
Test agregados usando la guia de Next with-jest https://github.com/zeit/next.js/tree/canary/examples/with-jest

## Tareas pendientes
* Comprame un café con QR
* Encuesta pa' saber qué features quiere la gente
* Configurar una Vaki pa' recibir donaciones pa' features
* Escribir blog post al respecto

* Mostrar el desglose de las deducciones
* Agregar botón para resetear inputs y volver a empezar
* Perfeccionar calculos para cada tipo de contrato
* Agregar test unitarios para cada caso de uso
* Leer paulgraham.com/writing44.html para mejorar la redacción y simplicidad del último parrafo
* Agregar Link Views
* Agregar tipo de ingreso "Integral"

* UI: Escribir detalle de los calculos
* UI: Tooltips de ayuda en cada input (deducciones especialmente) (Tener en cuenta salario flexible de Globant)
* UI: Cambiar alerts por warning amigables
* UI: Crear logo, agregarlo al favicon y a los diferentes tamaños png en images que usa el manifest.json
* UI: Agregar al css las cosas que le quitan esas flechas feas default al número de dependientes.
* UI: Agregarle formato de currency a todos los números que sean pesos
* UI: El titulo "Contrato" en el form posiblemente no tiene sentido dónde está.

* UX: No dejarlo agregar ingresos si el primero (o anterior) está vacío
* UX: Actualizar para que los consejos finales no se muestren hasta después de haber ingresado todas las deducciones
* UX: Validar que la fecha inicial no sea menos a 1 de enero de 2019 (y a 1 de enero de 2018 si lo vamos a usar para calcular cesantias)
