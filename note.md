El programa en su base de datos debe tener una lista con 12 coins, estas deben estar cada una en posicion
x,y,z diferentes a las otras.

cada vez que alguien seleccione una moneda primero hay que verificar si esta disponible,
al verificarlo si lo está, se debe eliminar de la base de datos o del array ya que estará 
seleccionada. En caso contrario se notificará que ya fue seleccionada y no esta disponible.

Al final deberá mostrar Room con la cantidad
de monedas disponibles.


- TAREAS:
- Una vez conectado, le tiene que indicar al microservicio en que espacio del metaverso está (room) entonces el microservicio le devuelve todas las monedas de esa room junto a su posición (x, y, z). LOGRADO

-El cliente puede mandar una señal al micro indicando que agarró una moneda, para que el micro la borre de las monedas disponibles. LOGRADO

-El micro debe mandar una señal a todos los clientes, indicando qué monedas dejan de estar disponibles (cuando alguien más la agarra). LOGRADO

-También se deberá montar una api rest para consultar varias o básicas, ej.: cantidad de monedas disponibles en una room. LOGRADO

-Otra característica, es que las monedas generadas tengan ttl, osea que cada 1 hora se generen otro set de monedas, y las de la hora anterior, se borren.