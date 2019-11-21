# Declara Renta

## Iniciar
* `yarn` para agregar los node_modules (NO usar `npm install`)
* `yarn dev` para iniciar el proyecto
* Abrir http://localhost:3000 en el navegador

## ¿Qué puedo hacer?
Ingresar todos los ingresos del año, todas las deducciones. El sistema calculara el valor óptimo que deberias gastar en medicina prepagada, pensiones voluntarias, dependientes, intereses de vivienda y donaciones.

## Test Unitarios
Test agregados usando la guia de Next with-jest https://github.com/zeit/next.js/tree/canary/examples/with-jest

## Tareas pendientes
* Perfeccionar calculos para cada tipo de contrato
    * Calculo de rete fuente para ciertos salarios (+ input modificable)
    * Verificar en FORM 220 si descuentos de prestaciones se descuentan del ingreso bruto
* Mostrar el desglose de las deducciones
* Poner primer fecha default como enero 1
* Agregar Unit Testing
* Agregar botón para resetear inputs y volver a empezar
* UI: Remove income source
* UI: Tooltips de ayuda en cada input (deducciones especialmente)
* UI: Cambiar alerts por warning amigables
* UI: Hacerlo mobile
* UX: Actualizar para que los consejos finales no se muestren hasta después de haber ingresado todas las deducciones
