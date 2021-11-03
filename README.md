# ClimApp
Weather app - Native Javascript
Este proyecto es una aplicación del tiempo, en el que se especifica la previsión meteorológica de cuatro días (el día actual, y los tres siguientes).

## Pre-requisitos

Soportado: Firefox - Chrome - Edge - Safari

## Introducción
Aplicación Web desarrollada en Javascript nativo, añadiendo estilo con HTML y CSS.

## Funcionalidades

En primera instancia tenemos un buscador (cuadro de texto + un botón de búsqueda), que nos permite buscar el lugar que queremos consultar.
Por defecto viene la ciudad de Madrid y siempre nos pondrá la primera letra con mayúscula.

Después tenemos el lugar que hemos buscado, por defecto de nuevo viene Madrid, y la fecha y hora de la ciudad o pais que hemos buscado.
La imagen que tenemos de fondo varia según la hora que tengamos en el sistema:
  - De 20pm a 7am tenemos una imagen oscura, ambas inclusives.
  - De 8 am a 19pm tenemos una imagen clara ambas inclusives.
 
 Para que el fondo, sea el correcto respecto a la hora de la ciudad, hemos realizado un pequeño cálculo, aprovechando el resultado de la API del campo timezone:
 ``` js
   let currentDay = new Date(); // obtenemos la hora local actual
   let localTime = currentDay.getTime(); // 
   let localOffset = currentDay.getTimezoneOffset() * 60000; // desfase horario local
   let utc = localTime + localOffset; // obtenemos la hora UTC actual
   let timezone = response.data.timezone; // obtenemos el campo de la API
   let newCountry = utc + (1000 * timezone); // convertimos el desfase de la ciudad de destino en milisegundos
   let contryDate = new Date(newCountry); // obtenemos el objeto Date JS de la ciudad deseada
```

Posteriormente, nos encontramos varios datos, proporcionados por la API gratuita: https://openweathermap.org/.

Consumimos dos Endpoint diferentes:
  - La primera /weather, 
De vuelve los datos meteorológicos por nombre de ciudad.
Pasamos por parámetro el nombre de la ciudad y la unidad métrica: 
``` js 
weather?q="+city+"&units=metric 
```
Los datos que se encuentran en el container central, son los datos a tiempo real de la ciudad introducida. 
Todos los datos se actualizan, incluyendo el símbolo correspondiente a la previsión climatológica, y los grados que corresponden al distinto listado falicitado por la API.
   
  - La segunda /forecast, 
 De vuelve los datos meteorológicos por nombre de ciudad, de la previsión de los 3 siguientes días.
 ``` js
 /forecast?q="+city+"&units=metric
 ```
 
 ## Uso
 La aplicación la he publicado en internet utilizando GitHub Page: https://patriciadmj.github.io/ClimApp/
 
 ## Dependencias
 https://erikflowers.github.io/weather-icons/ <br>
 https://openweathermap.org/
 
 ## Autor
 Patricia Del Moral Jimenez
