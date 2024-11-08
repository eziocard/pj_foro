Cosas importantes del repositorio

importante!!!
 para inicializar el proyecto tienes que encender la api con el comando fastapi dev main.py dentro de la carpeta Backend 
 y en fronted debes utilizar npm i para instalar todo y utilizar npm run dev dentro de la carpeta 

 las claves de accceso de la base de datos de grafos esta en un archvio llamado grafos-keys.txt que esta en la carpeta backend

 si vas a instalar librerias asegurate de estar en el entorno virtual
 
 si quieres hacer un push y instalaste una libreria nueva fijate que dentro de la carpeta venv no existe un archivo llamado gitingnore 
 ya que este hace que no se suba el entorno virtual al github

BACKEND:
        Para el backend utilice
        1.-un entorno virtual el cual contiene las librerias necesarias para que sea ejecutado todo correctamente:
                necesitas tener python actualizado usa el comando:
                        python --upgrade
                y para ejecutar el entorno virtual te vas a la carpeta atraves de la terminal, llamada  /pj_foro/venv/bin y dentro de la carpeta pones lo siguiente:
                        source active   #ojo no se si el comando es igual para windows pero cualquier cosa busca como ejecutar un entorno virtual y ya                      
        2.-main.py tiene las rutas a la cual se conecta el front y conexion.py es lo que tiene los metodos de conexion a la base de datos

Fronted: aqui la idea es que cuando inicie sesion el usuario le aparezca un dashboard como si fuera el feed de instagram donde uno ve publicaciones entonces es necesario
        que distribuyamos lo que sale en pantalla para que pueda seguir a personas ver publicaciones y crear publicacion y comentarios

        por si te preguntas para que sirve el app.module.css, es para que el css no pase a los componentes hijos ya que este se va heredando

        

                
