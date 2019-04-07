DROP TABLE IF EXISTS public.personas;
CREATE TABLE public.personas(
idpersona SERIAL NOT NULL PRIMARY KEY,
nombrepersona VARCHAR(100) NOT NULL
);

INSERT INTO public.personas(nombrepersona) VALUES
('Carlos'), ('Carloncho'),('César'),('Constanza'),
('Camila'), ('Teresa'),('Ever'),('Tomas'),
('Cristina'), ('Elizabeth'),('Cristal'),('Victoria'),
('Catalina'), ('Veronica'),('Elsa'),('Isabel'),
('Celeste'), ('Chupacabras'),('Adelaido'),('Didimo'),
('Coco'), ('Andres'),('Nelson'),('Victor'),
('Cacaroto'), ('Carloncho'),('José'),('Juan'),
('Quico'), ('Pedro'),('Alvaro'),('Vladimir');
