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
* Arreglar maximo descuento
* Agregar Link Views
* Perfeccionar calculos para cada tipo de contrato
* Hacer la retención total del Outcome component, un dato modificable
* Mostrar el desglose de las deducciones
* Agregar test unitarios para cada caso de uso
* Agregar botón para resetear inputs y volver a empezar
* Abstraer totalIncome en un solo lugar
* Tener en cuenta cesantias del año anterior y no del presente
* Agregar tipo de ingreso "Integral"
* El titulo "Contrato" en el form posiblemente no tiene sentido dónde está.
* Mover boton(es) Calcular abajo al lado de "Agregar Ingreso"
* Sacar las cesantias del ingreso por nómina del año actual a menos que no haya trabajado hasta diciembre 31 (En ese caso si fueron ingresos en la liquidación)
* Leer paulgraham.com/writing44.html para mejorar la redacción y simplicidad del último parrafo
* BUG: Cuándo se cambia el ingreso después de los dependientes se enloquece el input de dependientes

* Agregar un caret al select de contrato para que se entienda que se puede cambiar
* UI: Quitar los colores rojo y verde de los totales, cambiarlo por algo de la escala de de los grises oscuros. El único que debería tener color diferente debería ser el valor a pagar.
* UI: Remove income source
* UI: El placeholder del salario mensual no se lee completo
* UI: Tooltips de ayuda en cada input (deducciones especialmente) (Tener en cuenta salario flexible de Globant)
* UI: Cambiar alerts por warning amigables
* UI: Hacerlo mobile
* UI: Inventarse el logo, y agregarlo al favicon y a los diferentes tamaños png en images que usa el manifest.json
* UI: Agregar al css las cosas que le quitan esas flechas feas default al número de dependientes.
* UI: El primer resumen de todos los ingresos tiene un diseño muy simplista y sin padding.
* UI: Agregarle formato de currency a todos los números que sean pesos

* UX: Esconder los inputs de deducciones hasta que no hayan calculado totales de ingreso. (No mostrarlos si ingresos no dan pa' declarar renta)
* UX: Actualizar para que los consejos finales no se muestren hasta después de haber ingresado todas las deducciones
* UX: Validar que la fecha inicial no sea menos a 1 de enero de 2019 (y a 1 de enero de 2018 si lo vamos a usar para calcular cesantias)
