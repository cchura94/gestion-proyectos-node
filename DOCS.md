# Generacion de Modelos e migraciones
```
npx sequelize-cli model:generate --name Proyecto --attributes nombre:string,url:string,detalle:string

npx sequelize-cli model:generate --name Actividad --attributes titulo:string,descripcion:text,fecha_ven:date,estado:boolean,proyectoId:integer

npx sequelize-cli model:generate --name Usuario --attributes correo:string,clave:string,estado:boolean

npx sequelize-cli model:generate --name Role --attributes nombre:string,descripcion:string

npx sequelize-cli model:generate --name ActividadUsuario --attributes actividadId:integer,usuarioId:integer

npx sequelize-cli model:generate --name RoleUsuario --attributes roleId:integer,usuarioId:integer
```

## Para generar las migraciones con Sequelize
```
npx sequelize db:migrate
```