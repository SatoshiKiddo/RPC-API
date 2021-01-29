CREATE OR REPLACE FUNCTION Apertura_Cuenta(VARCHAR, VARCHAR, VARCHAR, VARCHAR)
	RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
	cantidad int;
	ultimo int;
BEGIN
	IF (EXISTS (SELECT * FROM Usuario WHERE Usuario.documento_id = $1)) THEN
		SELECT COUNT(*) FROM  Cuenta into cantidad WHERE Cuenta.documento_id_fk = $1;
		IF ( cantidad < 3) THEN
			SELECT MAX(numero) FROM Cuenta into ultimo;
			INSERT INTO Cuenta (numero, balance_actual, documento_id_fk) VALUES (ultimo + 1, 0, $1);
		ELSE
			RETURN 0;
		END IF;
	ELSE
		INSERT INTO Usuario (documento_id, nombre, nombre_usuario, contrasena) VALUES($1, $2, $3, $4);
		SELECT COALESCE(MAX(numero),1000) FROM Cuenta into ultimo;
		INSERT INTO Cuenta (numero, balance_actual, documento_id_fk) VALUES (ultimo + 1, 0, $1);
	END IF;
	RETURN ultimo + 1;
END;
$$;

CREATE OR REPLACE FUNCTION Consulta_Cuenta(VARCHAR)
	RETURNS TABLE(numero int, balance_actual real) as $BODY$
DECLARE
BEGIN
	RETURN QUERY SELECT Cuenta.numero, Cuenta.balance_actual FROM Cuenta WHERE documento_id_fk = $1;
END
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Consulta_Transacciones(INT, INT)
	RETURNS TABLE(id_transaccion int, monto real, fecha date, description date, id_cuenta_origen int, id_cuenta_destino int) as $BODY$
DECLARE
BEGIN
	RETURN QUERY SELECT Transaccion.id_transaccion, Transaccion.monto, Transaccion.fecha, Transaccion.description, Transaccion.id_cuenta_origen, Transaccion.id_cuenta_destino 
	FROM Transaccion 
	WHERE Transaccion.id_cuenta_origen = $1 OR Transaccion.id_cuenta_destino = $1 ORDER BY fecha DESC LIMIT $2;
END
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Consulta_Deposito(VARCHAR, INT)
	RETURNS VARCHAR as $BODY$
DECLARE
	nombre varchar;
BEGIN
	SELECT COALESCE(a.nombre, '') into nombre FROM Cuenta join Usuario a 
			   ON a.documento_id = Cuenta.documento_id_fk
			   WHERE Cuenta.numero = $2;
	RETURN nombre;
END
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Deposito(INT, REAL)
	RETURNS BOOLEAN as $BODY$
DECLARE
	balance_actual_a real;
BEGIN
	SELECT balance_actual into balance_actual_a from Cuenta where numero = $1;
	INSERT INTO Transaccion (monto, fecha, description, id_cuenta_origen, id_cuenta_destino)
	VALUES ($2, CURRENT_DATE, CURRENT_DATE, 0, $1);
	UPDATE Cuenta SET balance_actual = balance_actual_a + $2 WHERE Cuenta.numero = $1;
END
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Retiro(INT, REAL)
	RETURNS BOOLEAN as $BODY$
DECLARE
	balance_actual_a real;
BEGIN
	SELECT balance_actual into balance_actual_a from Cuenta where numero = $1;
	INSERT INTO Transaccion (monto, fecha, description, id_cuenta_origen, id_cuenta_destino)
	VALUES ($2, CURRENT_DATE, CURRENT_DATE, $1, 0);
	UPDATE Cuenta SET balance_actual = balance_actual_a - $2 WHERE Cuenta.numero = $1;
END
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Transferencia(INT, INT, REAL)
	RETURNS BOOLEAN as $BODY$
DECLARE
	balance_actual_a real;
	balance_actual_b real;
BEGIN
	SELECT balance_actual into balance_actual_a from Cuenta where numero = $1;
	SELECT balance_actual into balance_actual_b from Cuenta where numero = $2;
	INSERT INTO Transaccion (monto, fecha, description, id_cuenta_origen, id_cuenta_destino)
	VALUES ($3, CURRENT_DATE, CURRENT_DATE, $1, $2);
	UPDATE Cuenta SET balance_actual = balance_actual_a - $3 WHERE Cuenta.numero = $1;
	UPDATE Cuenta SET balance_actual = balance_actual_a - $3 WHERE Cuenta.numero = $2;
END
$BODY$
LANGUAGE plpgsql;