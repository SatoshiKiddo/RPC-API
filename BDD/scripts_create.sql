DROP TABLE IF EXISTS public.Usuario CASCADE;

CREATE TABLE Usuario (
	documento_id VARCHAR(9) NOT NULL,
	nombre varchar(50) NOT NULL,
	nombre_usuario varchar(50) NOT NULL,
	contrasena varchar(50) NOT NULL,
	PRIMARY KEY(documento_id)
);

DROP TABLE IF EXISTS public.Cuenta CASCADE;

CREATE TABLE Cuenta(
	numero INT NOT NULL,
	balance_actual REAL NOT NULL,
	documento_id_fk VARCHAR(9) NOT NULL,
	CONSTRAINT "FK_Usuario_cuenta" FOREIGN KEY (documento_id_fk)
		REFERENCES public.Usuario (documento_id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE CASCADE,
	PRIMARY KEY(numero)
);

DROP TABLE IF EXISTS public.Transaccion CASCADE;

CREATE TABLE Transaccion(
	id_transaccion INT NOT NULL,
	monto REAL,
	fecha DATE NOT NULL DEFAULT CURRENT_DATE,
	description DATE NOT NULL DEFAULT CURRENT_DATE,
	id_cuenta_origen INT,
	id_cuenta_destino INT,
	PRIMARY KEY (id_transaccion),
	CONSTRAINT "FK_cuenta_origen" FOREIGN KEY (id_cuenta_origen)
		REFERENCES public.Cuenta (numero) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE CASCADE,
	CONSTRAINT "FK_cuenta_destino" FOREIGN KEY (id_cuenta_destino)
		REFERENCES public.Cuenta (numero) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);