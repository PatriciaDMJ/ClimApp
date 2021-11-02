# ClimApp
Weather app - Native Javascript
Este proyecto es una aplicación del tiempo, en el que se especifica la previsión meteorológica de cuatro días (el día actual, y los tres siguientes).

## Pre-requisitos

Soportado: Firefox - Chrome - Edge

## Introducción
Aplicación Web desarrollada en Javascript nativo, añadiendo estilo con HTML y CSS.

### Funcionalidades

En primera instancia tenemos un buscador (cuadro de texto + un botón de búsqueda), que nos permite buscar el lugar que queremos consultar.
Por defecto viene la ciudad de Madrid y siempre nos pondrá la primera letra con mayúscula.

Después tenemos el lugar que hemos buscado, por defecto de nuevo viene Madrid, y la fecha y hora de la ciudad o pais que hemos buscado.
La imagen que tenemos de fondo varia según la hora que tengamos en el sistema:
  - De 20pm a 7am tenemos una imagen oscura.
  - De 7 am a 20pm tenemos una imagen clara.
    
Posteriormente, nos encontramos varios datos, proporcionados por la API gratuita: https://openweathermap.org/.

Tenemos dos APIs distintas:
  - La primera que realizamos, pasamos el parámetro de la ciudad buscada y nos proporciona los datos que se encuentran en el container central, siendo información del día de sistema actual. 
  Todos los datos se actualizan, incluyendo el símbolo correspondiente a la previsión climatológica, y los grados que corresponden al distinto listado falicitado por la API.
   
  - La segunda API, también le pasamos el parámetro de ciudad buscada y nos proporciona los datos de 40 días (empieza con el dia local y 40 días más). En este caso hemos cogido simplemente 3 días para la realización de la búsqueda de temperatura y símbolo de la previsión
