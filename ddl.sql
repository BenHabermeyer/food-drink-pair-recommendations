CREATE TABLE wine_review (      ---- cardinality: 116814
id int NOT NULL, 
title varchar(200) NOT NULL,
points int,
PRIMARY KEY (id, title),
FOREIGN KEY (title) REFERENCES wine_origin(title)
);

select count(*)   
from wine_review;

CREATE TABLE location (    ---cardinality: 447
province varchar(35) NOT NULL,
country varchar(30),
PRIMARY KEY (province)
);

select count(*)   
from location;


CREATE TABLE wine_origin (    ---cardinality: 107388
title varchar(200) NOT NULL,
winery varchar(80),
Province varchar(65),
price int,
variety varchar(40),
vintage int,
PRIMARY KEY (title),
FOREIGN KEY (province) REFERENCES location(province)
);

select count(*)  
from wine_origin;

---- some queries to debug

select t.title
from wine_review t
WHERE t.title NOT IN (select title from wine_origin);

ALTER TABLE wine_review
ADD FOREIGN KEY (title) 
REFERENCES PENNDRINKERS.wine_origin(title);

ALTER TABLE wine_origin
ADD FOREIGN KEY (province) 
REFERENCES PENNDRINKERS.location(province);

ALTER TABLE wine_pair
ADD FOREIGN KEY (variety) 
REFERENCES PENNDRINKERS.wine_origin(variety);


select distinct d.province
from beer_origin d
where d.Province NOT IN (SELECT p.province FROM location p);


select province
from location;

select beer_style
from beer_pair 
WHERE beer_style NOT IN (SELECT beer_style from beer_origin);

select variety
from wine_pair
WHERE variety NOT IN (SELECT variety from wine_origin);



-----


CREATE TABLE food_info (   ----- cardinality: 1732
food varchar(50) NOT NULL, 
PRIMARY KEY (food)
);


CREATE TABLE beer_origin (   ----- cardinality:  17330
beer_name varchar(80) NOT NULL,
beer_style varchar(45),
brewery_name varchar (50),
Province varchar(40),
PRIMARY KEY (beer_name),
FOREIGN KEY(province) REFERENCES location(province)
);


select count(*)
from beer_origin;


CREATE TABLE beer_review (   ----- cardinality: 1048575
id int NOT NULL,
beer_name varchar(80) NOT NULL,
rating int,
PRIMARY KEY (id, beer_name),
FOREIGN KEY(beer_name) REFERENCES beer_origin(beer_name)
)

select count(*)
from beer_review;



select count(*)  
from food_info;

CREATE TABLE wine_pair (  ----- cardinality: 5894
variety varchar(40) NOT NULL,
food varchar(50) NOT NULL,
rating int,
PRIMARY KEY (variety, food),
FOREIGN KEY(food) REFERENCES food_info(food)
);


select count(*)  
from wine_pair;

CREATE TABLE beer_pair (     ----- cardinality: 1344
beer_style varchar(45) NOT NULL,
food varchar(50) NOT NULL,
rating int,
PRIMARY KEY (beer_style, food),
FOREIGN KEY(food) REFERENCES food_info(food)
);

select count(*)  
from beer_pair;

