> Código Open Source

# Declara Renta [(ver la app)](https://declaracion-de-renta.now.sh/) 👀

## Stack

* Back: Next ⏭️
* Front: React + Redux ⚛️
* Test Unitarios:Jest 🥼
* Estilos: SASS + Modules 💅
* Servidor: Zeit 🖥️
* Super Poderes: PWA 📱

## Iniciar
* `yarn` para agregar los node_modules (NO usar `npm install`)
* `yarn dev` para iniciar el proyecto
* Abrir http://localhost:3000 en el navegador

## Proposito
Ayudar a los declarantes o contadores a estimar el valor a pagar en la declaración de renta. Es mobile-first así que debería ser fácil de abrir y usar en cualquier teléfono móvil.

## ¿Cómo se usa?
Se ingresan todos los ingresos del año, si superaron el limite de 1400 UVTs, se preguntan por las posibles deducciones. Luego te arroja el valor estimado a pagar, con un resumen de los calculos hechos.
A modo de sugerencia para optimizar la declaración, debemos calcular el valor óptimo que deberias gastar en medicina prepagada, pensiones voluntarias, dependientes, intereses de vivienda y/o donaciones.

## Test unitarios
Estamos usando Jest y Enzime, la implementación inicial se hizo usando la guia de Next with-jest https://github.com/zeit/next.js/tree/canary/examples/with-jest

## Algunas tareas pendientes
#### Varias
* Completar el diseño para Desktop
* Migrar los calculos de sugerencias al nuevo diseño
* Implementar sistema de donación tipo "Comprame un café con QR"
* Escribir blog post al respecto explicando el proyecto
* Mostrar el desglose de las deducciones
* Agregar botón para resetear inputs y volver a empezar
* Perfeccionar cálculos para cada tipo de contrato
* Revisar cobertura de test unitarios
* Agregar Link Views (metatags de redes sociales)
* Agregar tipo de ingreso "Integral"
* Explicar el uso del salario flexible (e.g. el de Globant)
#### UI
* UI: Escribir adyuas para explicar algunos campos
* UI: Cambiar alerts por warning amigables
* UI: Actualizar logo en favicon y a los diferentes tamaños png en /images que use el manifest.json
* UI: Agregarle formato de currency a todos los números que sean pesos
* UI: Tooltips de ayuda en cada input (deducciones especialmente), tener en cuenta cómo se comportan en mobile.
#### UX
* UX: No dejarlo agregar ingresos si el primero (o anterior) está vacío
* UX: Validar que la fecha inicial no sea menor a 1 de enero de 2019 (y a 1 de enero de 2018 si lo vamos a usar para calcular cesantias)

## Licencia

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

Para cualquier uso sin animo de lucro, [Diego Ortiz](https://www.diegoortiz.co/)sede los derechos para que sea usado y/o mejorado por la comunidad.
