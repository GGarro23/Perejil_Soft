-Si no se tiene instalado se puede instalar desde: https://nodejs.org/es

## 1. Primero se tiene que inicializar git
asi que en la carpeta donde van a trabajar el proyecto, abren una nueva terminal, revisan que esten en el directorio correcto y luego:

```bash
git init
```

## 2. Luego se tiene que conectar con el repositorio de github
para eso van al link que les pase, le dan a [<>code] y copian el link, luego en la terminal hacen:

```bash
git remote add origin 'link'
```

en este caso seria:

```bash
git remote add origin https://github.com/GGarro23/Perejil_Soft.git
```

## 3. Ahora se hara el primer pull
esto copiara los archivos del directorio en nuestra carpeta principal, ejemplo "proyecto 2", con el siguiente comando:

```bash
git pull origin main
```

Si esto da error por branches(pasa a veces), se puede intentar de la siguiente manera:

```bash
git branch -M main
git pull origin main
```

## 4. Manejo de branches
Para evitar errores, vamos a trabajar por branches(ramas) donde cada uno va a trabajar

### 4.1. Antes de trabajar
```bash
git checkout main
git pull origin main
```

Esto nos hara tener la version mas actualizada del proyecto

### 4.2. Crear una rama para lo que voy a trabajar(a menos de que anteriormente ya se hay creado y no terminado)

```bash
git checkout -b nombre-de-la-tarea
```

Ejemplo:

```bash
git checkout -b backend-pedidos
```

### 4.3. Intentar trabajar solo en la carpeta correspondiente

Frontend/ Sera para interfaz, se trabajara con React y Tailwind  
Backend/  Sera toda la funcionalidad, conecciones entre otros, se trabajara con Node.js y Express  
Database/ Sera donde se desarrollara la base de datos, usando los scripts entre otros.

### 4.4. Antes de subir cambios, revisar siempre los archivos que modifique para no subir cambios que no quiero

```bash
git status
```

### 4.5. Agregar solo donde trabaje

#### 4.5.1 Ejemplos
```bash
git add Frontend/
git add Backend/
git add Database/
```

#### 4.5.2
Se puede utilizar tambien

```bash
git add .
```

Esto lo que hara sera agregar todos los archivos de la carpeta donde estamos, pero no es recomendable ya que sera TODO lo que se suba  
reemplazando el resto de archivos, por lo que si por ejemplo, se hace mientras se esta en Fronted/Pages/, o en Backend/Conections/ sera  
todo lo que se subira del proyecto, reemplazando todo lo demas, si se va a utilizar, procurar estar en la carpeta raiz del proyecto(donde  
se encuentran las carpetas de Frontend/, Backend/ y Database/)

### 4.6. Hacer un commit

Antes de subir un archivo, tenemos que hacer un commit, esto es basicamente, empaquetar lo que pusimos en el git add anterior, y subirlo a  
la rama en la que estamos(intentar que no sea en main).

Para esto el comando es:

```bash
git commit -m "nombre del cambio"
```

Por ejemplo:

```bash
git commit -m "frontend:agregar navbar"
git commit -m "backend: se hizo la funcion para conectar con frontend"
```

### 4.7. Subir mis cambios a mi rama

```bash
git push origin nombre-de-la-rama
```

ejemplo

```bash
git push origin backend-pedidos
```

### 4.8. REGLA DE ORO:

No hacer cambios directamente en la rama main.  
Siempre trabajar en una rama nueva.  
No usar git push --force.

## 5. Agregar al proyecto principal

Una vez que terminemos de trabajar en la funcionalidad o tarea que teniamos, y queramos agregarla al proyecto principal, vamos a hacer un merge  
de la rama en la que trabajamos con el main

### 5.1. Es buena practica avisar antes de hacer merge con la rama principal.

### 5.2. Cuando terminamos de trabajar en nuestra rama y la queremos juntar, vamos a la principal

```bash
git checkout main
```

### 5.3. Actualizamos el main

```bash
git pull origin main
```

### 5.4. Hacemos merge con la rama que terminamos

```bash
git merge nombre-de-la-rama
```

### 5.5. Subir los cambios de la rama de trabajo a la principal

```bash
git push origin main
```

## 6. Verificar que el frontend funciona

### 6.1. Instalar los paquetes necesarios

En el directorio de frontend

```bash
npm install
```

Esto es buena practica hacerlo cada que se hace un git pull.

### 6.2. Verificar el frontend

Cada que queramos correr el fronend y ver cambios realizados o como va quedando hacemos.

```bash
npm run dev
```

Esto nos dara un mensaje con un link(normalmente localhost) el cual nos abrira la pantalla principal del frontend, react y tailwind dan una por defecto por si lo quieren ver.

## 7. Verificar que el backend funciona

### 7.1. Instalar los paquetes necesarios

En el directorio de Backend hacemos

```bash
npm install
```

Esto es buena practica hacerlo cada que se hace un git pull.

### 7.2. Verificamos que el backend corre

```bash
node index.js
```

(agregado reciente)  
ahora tambien se puede con npm run dev como en el frontend  

Esto nos deberia de dar un mensaje de que el servidor esta corriendo en localhost, aunque esto puede cambiar en el futuro durante el desarrollo.