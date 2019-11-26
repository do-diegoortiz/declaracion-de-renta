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
* Abstraer totalIncome en un solo lugar
* Hacer la retención total del Outcome component, un dato modificable
* Mostrar el desglose de las deducciones
* Agregar botón para resetear inputs y volver a empezar
* BUG: Cuándo se cambia el ingreso después de los dependientes se enloquece el input de dependientes
* Perfeccionar calculos para cada tipo de contrato
* Agregar test unitarios para cada caso de uso
* Tener en cuenta cesantias del año anterior y no del presente
* Sacar las cesantias del ingreso por nómina del año actual a menos que no haya trabajado hasta diciembre 31 (En ese caso si fueron ingresos en la liquidación)
* Leer paulgraham.com/writing44.html para mejorar la redacción y simplicidad del último parrafo
* Agregar Link Views
* Agregar tipo de ingreso "Integral"

* UI: Mover boton(es) Calcular abajo al lado de "Agregar Ingreso"
* UI: Remove income source
* UI: Tooltips de ayuda en cada input (deducciones especialmente) (Tener en cuenta salario flexible de Globant)
* UI: Cambiar alerts por warning amigables
* UI: Hacerlo mobile
* UI: Inventarse el logo, y agregarlo al favicon y a los diferentes tamaños png en images que usa el manifest.json
* UI: Agregar al css las cosas que le quitan esas flechas feas default al número de dependientes.
* UI: El primer resumen de todos los ingresos tiene un diseño muy simplista y sin padding.
* UI: Agregarle formato de currency a todos los números que sean pesos
* UI: El titulo "Contrato" en el form posiblemente no tiene sentido dónde está.

* UX: Esconder los inputs de deducciones hasta que no hayan calculado totales de ingreso. (No mostrarlos si ingresos no dan pa' declarar renta)
* UX: Actualizar para que los consejos finales no se muestren hasta después de haber ingresado todas las deducciones
* UX: Validar que la fecha inicial no sea menos a 1 de enero de 2019 (y a 1 de enero de 2018 si lo vamos a usar para calcular cesantias)
