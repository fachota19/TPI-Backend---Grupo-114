levantar esto 
PS C:\Users\surly\Documents\TPI-Backend---Grupo-114> docker exec -it usuarios-db psql -U postgres -d usuariosdb
psql (16.11 (Debian 16.11-1.pgdg13+1))
Type "help" for help.

usuariosdb=# INSERT INTO tipos_rol (nombre, descripcion) VALUES ('CLIENTE', 'Rol Cliente');
INSERT INTO tipos_rol (nombre, descripcion) VALUES ('TRANSPORTISTA', 'Rol Transportista');
INSERT INTO tipos_rol (nombre, descripcion) VALUES ('OPERADOR', 'Rol Operador');
INSERT 0 1
INSERT 0 1
INSERT 0 1
usuariosdb=# \q